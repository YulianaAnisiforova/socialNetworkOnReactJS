import {usersAPI} from '../api/api'
import {updateObjectInArray} from './objectHelpers'
import {UserType} from '../types/types'
import {ThunkAction} from 'redux-thunk'
import {AppStateType} from './store'
import {Dispatch} from 'redux'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    isFollowingInProgress: [] as Array<number>,
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
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


type FollowSuccessType = {
    type: typeof FOLLOW,
    userID: number,
}
type UnfollowSuccessType = {
    type: typeof UNFOLLOW,
    userID: number,
}
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>,
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number,
}
type SetTotalCountType = {
    type: typeof SET_TOTAL_COUNT,
    totalUsersCount: number,
}
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean,
}
type ToggleIsFollowingInProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFetching: boolean,
    userID: number,
}

type ActionType = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetCurrentPageType | SetTotalCountType |
    ToggleIsFetchingType | ToggleIsFollowingInProgressType

export const followSuccess = (id: number): FollowSuccessType => ({type: FOLLOW, userID: id})
export const unfollowSuccess = (id: number): UnfollowSuccessType => ({type: UNFOLLOW, userID: id})
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users: users})
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage: currentPage})
export const setTotalUsersCount = (totalUsersCount: number): SetTotalCountType => ({type: SET_TOTAL_COUNT, totalUsersCount: totalUsersCount})
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})
export const toggleIsFollowingInProgress = (isFetching: boolean, userID: number): ToggleIsFollowingInProgressType => ({
    type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFetching,
    userID
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType =>
    async (dispatch, getState) => {
    dispatch(toggleIsFetching(true))

    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const getUsers2 = (pageNumber: number, pageSize: number): ThunkType =>
    async (dispatch) => {
    dispatch(setCurrentPage(pageNumber))

    dispatch(toggleIsFetching(true))
    let data = await usersAPI.getUsers2(pageNumber, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionType>, userID: number,
                                   apiMethod: any,
                                   actionCreator: (userID: number) => FollowSuccessType | UnfollowSuccessType) =>
{
    dispatch(toggleIsFollowingInProgress(true, userID))

    let data = await apiMethod(userID)
    dispatch(toggleIsFollowingInProgress(false, userID))
    if (data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
}

export const unfollow = (userID: number): ThunkType =>
    async (dispatch) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.deleteUnfollow.bind(usersAPI), unfollowSuccess)
}

export const follow = (userID: number): ThunkType =>
    async (dispatch) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.postFollow.bind(usersAPI), followSuccess)
}

export default usersReducer
