import {PhotosType, PostType, ProfileType} from '../types/types'
import {profileAPI} from '../api/profileAPI'
import {BaseThunkType, InferActionType} from './store'

let initialState = {
    posts: [
        {
            id: 3,
            message: 'I`m going to visit my gruncle Stan again this summer OMG soooo excited!! Looking forward to meet him again!!!!!',
            likes: 1488
        },
        {id: 2, message: 'My brother Dipper is sooooo annoying', likes: 2},
        {
            id: 1, message: 'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la', likes: 0
        },
        {id: 0, message: 'Hello everyone it`s my first post here haha', likes: 7},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string | null,
    contactsError: null as Array<string> | null,
}

export type InitialStateType = typeof initialState
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>

const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [{id: state.posts.length, message: action.newPost, likes: 0,}, ...state.posts],
            }
        case 'SET_USER_PROFILE':
            return {
                ...state, profile: action.profile
            }
        case 'SET_STATUS':
            return {
                ...state, status: action.status
            }
        case 'DELETE_POST':
            return {
                ...state, posts: state.posts.filter(post => post.id !== action.postID)
            }
        case 'SAVE_AVATAR_SUCCESS':
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        case 'CONTACTS_ERROR':
            return {...state, contactsError: action.contactsError}
        default:
            return state
    }
}

export const actions = {
    addPostActionCreator: (newPost: string) => ({type: 'ADD_POST', newPost} as const),
    deletePostActionCreator: (postID: number) => ({type: 'DELETE_POST', postID} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile: profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status: status} as const),
    saveAvatarSuccess: (photos: PhotosType) => ({type: 'SAVE_AVATAR_SUCCESS', photos} as const),
    contactsErrorAC: (contactsError: Array<string> | null) => ({type: 'CONTACTS_ERROR', contactsError: contactsError} as const),
}

export const getUserProfile = (userID: number | null): ThunkType =>
    async (dispatch) => {
    let data = await profileAPI.getProfile(userID)
    dispatch(actions.setUserProfile(data))
}
export const getUserStatus = (userID: number): ThunkType =>
    async (dispatch) => {
    let data = await profileAPI.getStatus(userID)
    dispatch(actions.setStatus(data))
}

export const updateUserStatus = (status: string): ThunkType =>
    async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const saveAvatar = (file: PhotosType): ThunkType =>
    async (dispatch) => {
    let data = await profileAPI.saveAvatar(file)
    if (data.resultCode === 0) {
        dispatch(actions.saveAvatarSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType =>
    async (dispatch, getState) => {
    let userID = getState().auth.userID
    let data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        dispatch(getUserProfile(userID))
        dispatch(actions.contactsErrorAC(null))
    } else {
        dispatch(actions.contactsErrorAC(data.messages))
    }
}

export default profileReducer