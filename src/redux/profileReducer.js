import {profileAPI} from '../api/api'
import {loginErrorAC} from "./authReducer";

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
            likes: '1488'
        },
        {id: 2, message: 'My brother Dipper is sooooo annoying', likes: '2'},
        {
            id: 1, message: 'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la', likes: '0'
        },
        {id: 0, message: 'Hello everyone it`s my first post here haha', likes: '7'},
    ],
    profile: null,
    status: '',
    contactsError: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [{id: state.posts.length, message: action.newPost, likesCount: 0,}, ...state.posts],
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
                ...state, profile: {...state.profile, photos: action.photos}
            }
        case CONTACTS_ERROR:
            return {...state, contactsError: action.contactsError}
        default:
            return state
    }
}

export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost})
export const deletePostActionCreator = (postID) => ({type: DELETE_POST, postID})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile: profile})
export const setStatus = (status) => ({type: SET_STATUS, status: status})
export const saveAvatarSuccess = (photos) => ({type: SAVE_AVATAR_SUCCESS, photos})
export const contactsErrorAC = (contactsError) => ({type: CONTACTS_ERROR, contactsError: contactsError})

export const getUserProfile = (userID) => async (dispatch) => {
    let response = await profileAPI.getProfile(userID)
    dispatch(setUserProfile(response.data))
}
export const getUserStatus = (userID) => async (dispatch) => {
    let response = await profileAPI.getStatus(userID)
    dispatch(setStatus(response.data))
}

export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const saveAvatar = (file) => async (dispatch) => {
    let data = await profileAPI.saveAvatar(file)
    if (data.resultCode === 0) {
        dispatch(saveAvatarSuccess(data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    let userID = getState().auth.userID
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userID))
        dispatch(contactsErrorAC(''))
    } else {
        dispatch(contactsErrorAC(data.messages))
    }
}

export default profileReducer