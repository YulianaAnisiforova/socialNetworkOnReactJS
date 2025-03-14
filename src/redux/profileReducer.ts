import {PhotosType, PostType, ProfileType} from '../types/types'
import {profileAPI} from '../api/profileAPI'

const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_AVATAR_SUCCESS = 'SAVE_AVATAR_SUCCESS'
const CONTACTS_ERROR = 'CONTACTS_ERROR'

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

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [{id: state.posts.length, message: action.newPost, likes: 0,}, ...state.posts],
            }
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state, status: action.status
            }
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(post => post.id !== action.postID)
            }
        case SAVE_AVATAR_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        case CONTACTS_ERROR:
            return {...state, contactsError: action.contactsError}
        default:
            return state
    }
}

type AddPostActionType = {
    type: typeof ADD_POST,
    newPost: string,
}
type DeletePostActionType = {
    type: typeof DELETE_POST,
    postID: number,
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType,
}
type SetStatusType = {
    type: typeof SET_STATUS,
    status: string,
}
type SaveAvatarSuccessType = {
    type: typeof SAVE_AVATAR_SUCCESS,
    photos: PhotosType,
}
type ContactsErrorACType = {
    type: typeof CONTACTS_ERROR,
    contactsError: Array<string> | null,
}

export const addPostActionCreator = (newPost: string): AddPostActionType => ({type: ADD_POST, newPost})
export const deletePostActionCreator = (postID: number): DeletePostActionType => ({type: DELETE_POST, postID})
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile: profile})
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status: status})
export const saveAvatarSuccess = (photos: PhotosType): SaveAvatarSuccessType => ({type: SAVE_AVATAR_SUCCESS, photos})
export const contactsErrorAC = (contactsError: Array<string> | null): ContactsErrorACType => ({type: CONTACTS_ERROR, contactsError: contactsError})

export const getUserProfile = (userID: number) => async (dispatch: any) => {
    let data = await profileAPI.getProfile(userID)
    dispatch(setUserProfile(data))
}
export const getUserStatus = (userID: number) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userID)
    dispatch(setStatus(data))
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const saveAvatar = (file: PhotosType) => async (dispatch: any) => {
    let data = await profileAPI.saveAvatar(file)
    if (data.resultCode === 0) {
        dispatch(saveAvatarSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    let userID = getState().auth.userID
    let data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        dispatch(getUserProfile(userID))
        dispatch(contactsErrorAC(null))
    } else {
        dispatch(contactsErrorAC(data.messages))
    }
}

export default profileReducer