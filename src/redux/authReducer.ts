import {authAPI, securityAPI} from '../api/api'

const SET_USER_DATA = 'network/auth/SET-USER-DATA'
const LOGIN_ERROR = 'network/auth/LOGIN_ERROR'
const GET_CAPTCHA_SUCCESS = 'network/auth/GET_CAPTCHA_SUCCESS'

// export type InitialStateType = {
//     userID: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean,
//     loginError: string | null,
//     captchaURL: string | null,
// }

let initialState = {
    userID: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    loginError: '' as string | null,
    captchaURL: null as string | null,
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case LOGIN_ERROR:
            return {...state, loginError: action.loginError}
        case GET_CAPTCHA_SUCCESS:
            return {...state, captchaURL: action.captchaURL}
        default:
            return state
    }
}

type SetAuthUserDataPayloadType = {
    userID: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataPayloadType,
}

type GetCaptchaSuccessActionType = {
    type: typeof GET_CAPTCHA_SUCCESS,
    captchaURL: string,
}

type LoginErrorActionType = {
    type: typeof LOGIN_ERROR,
    loginError: string,
}

export const setAuthUserData = (userID: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userID, email, login, isAuth}
})
export const getCaptchaSuccess = (captchaURL: string): GetCaptchaSuccessActionType => ({type: GET_CAPTCHA_SUCCESS, captchaURL: captchaURL})
export const loginErrorAC = (loginError: string): LoginErrorActionType => ({type: LOGIN_ERROR, loginError: loginError})

export const authMe = () => async (dispatch: any) => {
    let response = await authAPI.getAuthMe()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(response.data.data.id,
            response.data.data.email, response.data.data.login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captchaURL: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captchaURL)
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

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaURL = () => async (dispatch: any) => {
    const data = await securityAPI.getCaptchaURL()
    const captchaURL = data.url

    dispatch(getCaptchaSuccess(captchaURL))
}

export default authReducer
