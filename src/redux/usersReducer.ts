import {usersAPI} from '../api/api'
import {updateObjectInArray} from './objectHelpers'
import {UserType} from '../types/types'
import {ThunkAction} from 'redux-thunk'
import {AppStateType, InferActionType} from './store'
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

type ActionType = InferActionType<typeof actions>

export const actions = {
    followSuccess: (id: number) => ({type: FOLLOW, userID: id} as const),
    unfollowSuccess: (id: number) => ({type: UNFOLLOW, userID: id} as const),
    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users: users} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage: currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: SET_TOTAL_COUNT, totalUsersCount: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching} as const),
    toggleIsFollowingInProgress: (isFetching: boolean, userID: number) => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userID} as const),
}

// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const getUsers = (currentPage: number, pageSize: number) =>
    async (dispatch: any) => {
    dispatch(actions.toggleIsFetching(true))

    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
}

export const getUsers2 = (pageNumber: number, pageSize: number) =>
    async (dispatch: any) => {
    dispatch(actions.setCurrentPage(pageNumber))

    dispatch(actions.toggleIsFetching(true))
    let data = await usersAPI.getUsers2(pageNumber, pageSize)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionType>, userID: number,
                                   apiMethod: any,
                                   actionCreator: (userID: number) => FollowSuccessType | UnfollowSuccessType) =>
{
    dispatch(actions.toggleIsFollowingInProgress(true, userID))

    let data = await apiMethod(userID)
    dispatch(actions.toggleIsFollowingInProgress(false, userID))
    if (data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
}

export const unfollow = (userID: number) =>
    async (dispatch: any) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.deleteUnfollow.bind(usersAPI), actions.unfollowSuccess)
}

export const follow = (userID: number) =>
    async (dispatch: any) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.postFollow.bind(usersAPI), actions.followSuccess)
}

export default usersReducer
