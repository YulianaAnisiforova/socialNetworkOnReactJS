import {authAPI, securityAPI} from '../api/api'

const SET_USER_DATA = 'network/auth/SET-USER-DATA'
const TOGGLE_IS_FETCHING = 'network/auth/TOGGLE-IS-FETCHING'
const LOGIN_ERROR = 'network/auth/LOGIN_ERROR'
const GET_CAPTCHA_SUCCESS = 'network/auth/GET_CAPTCHA_SUCCESS'

let initialState = {
    userID: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    loginError: '',
    captchaURL: null,
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
        case GET_CAPTCHA_SUCCESS:
            return {...state, captchaURL: action.captchaURL}
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
export const getCaptchaSuccess = (captchaURL) => ({type: GET_CAPTCHA_SUCCESS, captchaURL: captchaURL})

export const authMe = () => async (dispatch) => {
    let response = await authAPI.getAuthMe()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(response.data.data.id,
            response.data.data.email, response.data.data.login, true))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(authMe())
        dispatch(loginErrorAC(''))
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaURL())
        }
        dispatch(loginErrorAC(response.data.messages))
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaURL = () => async (dispatch) => {
    const data = await securityAPI.getCaptchaURL()
    const captchaURL = data.url

    dispatch(getCaptchaSuccess(captchaURL))
}

export default authReducer
