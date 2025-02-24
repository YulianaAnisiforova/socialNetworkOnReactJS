import {authAPI} from '../api/api'

const SET_USER_DATA = 'SET-USER-DATA'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'

let initialState = {
    userID: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}


export const setAuthUserData = (userID, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userID, email, login, isAuth}
})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})

export const authMe = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))

        authAPI.getAuthMe().then(response => {
            dispatch(toggleIsFetching(false))
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(response.data.data.id,
                    response.data.data.email, response.data.data.login, true))
            }
        })
    }
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))

        authAPI.login(email, password, rememberMe).then(response => {
            dispatch(toggleIsFetching(false))
            if (response.data.resultCode === 0) {
                dispatch(authMe())
            }
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))

        authAPI.logout().then(response => {
            dispatch(toggleIsFetching(false))
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
    }
}

export default authReducer
