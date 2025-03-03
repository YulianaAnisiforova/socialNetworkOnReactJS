import {authAPI} from '../api/api'

const SET_USER_DATA = 'SET-USER-DATA'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const LOGIN_ERROR = 'LOGIN_ERROR'

let initialState = {
    userID: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    loginError: '',
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case LOGIN_ERROR:
            return {...state, loginError: action.loginError}
        default:
            return state
    }
}


export const setAuthUserData = (userID, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userID, email, login, isAuth}
})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})
export const loginErrorAC = (loginError) => ({type: LOGIN_ERROR, loginError: loginError})

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
                dispatch(loginErrorAC(''))
            } else {
                dispatch(loginErrorAC(response.data.messages))
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
