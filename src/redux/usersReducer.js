import {usersAPI} from '../api/api'
import {updateObjectInArray} from './objectHelpers'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE-IS-FOLLOWING-IN-PROGRESS'

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true}),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false}),
            }
        case SET_USERS:
            return {
                ...state, users: action.users,
            }
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                isFollowingInProgress: action.isFetching
                    ? [...state.isFollowingInProgress, action.userID]
                    : state.isFollowingInProgress.filter(id => id !== action.userID)
            }
        default:
            return state
    }
}


export const followSuccess = (id) => ({type: FOLLOW, userID: id})
export const unfollowSuccess = (id) => ({type: UNFOLLOW, userID: id})
export const setUsers = (users) => ({type: SET_USERS, users: users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_COUNT, totalUsersCount: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})
export const toggleIsFollowingInProgress = (isFetching, userID) => ({
    type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFetching,
    userID
})

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true))

    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const getUsers2 = (pageNumber, pageSize) => async (dispatch) => {
    dispatch(setCurrentPage(pageNumber))

    dispatch(toggleIsFetching(true))
    let data = await usersAPI.getUsers2(pageNumber, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
}

const followUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingInProgress(true, userID))

    let data = await apiMethod(userID)
    dispatch(toggleIsFollowingInProgress(false, userID))
    if (data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
}

export const unfollow = (userID) => async (dispatch) => {
    followUnfollowFlow(dispatch, userID, usersAPI.deleteUnfollow.bind(usersAPI), unfollowSuccess)
}

export const follow = (userID) => async (dispatch) => {
    followUnfollowFlow(dispatch, userID, usersAPI.postFollow.bind(usersAPI), followSuccess)
}

export default usersReducer
