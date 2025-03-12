import {authAPI, ResultCodesEnum, securityAPI} from '../api/api'

const SET_USER_DATA = 'network/auth/SET-USER-DATA'
const LOGIN_ERROR = 'network/auth/LOGIN_ERROR'
const GET_CAPTCHA_SUCCESS = 'network/auth/GET_CAPTCHA_SUCCESS'

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
    payload: {captchaURL: string},
}

type LoginErrorActionType = {
    type: typeof LOGIN_ERROR,
    loginError: Array<string> | null,
}

export const setAuthUserData = (userID: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userID, email, login, isAuth}
})
export const getCaptchaSuccess = (captchaURL: string): GetCaptchaSuccessActionType => ({type: GET_CAPTCHA_SUCCESS, payload: {captchaURL}})
export const loginErrorAC = (loginError: Array<string> | null): LoginErrorActionType => ({type: LOGIN_ERROR, loginError: loginError})

export const authMe = () => async (dispatch: any) => {
    let data = await authAPI.getAuthMe()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(data.data.id,
            data.data.email, data.data.login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(authMe())
        dispatch(loginErrorAC(null))
    } else {
        if (data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaURL())
        }
        dispatch(loginErrorAC(data.messages))
    }
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaURL = () => async (dispatch: any) => {
    const data = await securityAPI.getCaptchaURL()
    const captchaURL = data.url

    dispatch(getCaptchaSuccess(captchaURL))
}

export default authReducer
