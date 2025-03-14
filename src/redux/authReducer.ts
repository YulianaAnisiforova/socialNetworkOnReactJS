import {ResultCodesEnum} from '../api/api'
import {BaseThunkType, InferActionType} from './store'
import {authAPI} from '../api/authAPI'
import {securityAPI} from '../api/captchaAPI'

let initialState = {
    userID: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    loginError: null as Array<string> | null,
    captchaURL: null as string | null,
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        case 'LOGIN_ERROR':
            return {...state, loginError: action.loginError}
        case 'GET_CAPTCHA_SUCCESS':
            return {...state, captchaURL: action.payload.captchaURL}
        default:
            return state
    }
}

type ActionType = InferActionType<typeof actions>

export const actions = {
    setAuthUserData: (userID: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {userID, email, login, isAuth}
    } as const),
    getCaptchaSuccess: (captchaURL: string) => ({type: 'GET_CAPTCHA_SUCCESS', payload: {captchaURL}} as const),
    loginErrorAC: (loginError: Array<string> | null) => ({type: 'LOGIN_ERROR', loginError: loginError} as const),
}

type ThunkType = BaseThunkType<ActionType>

export const authMe = (): ThunkType =>
    async (dispatch) => {
    let data = await authAPI.getAuthMe()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(data.data.id,
            data.data.email, data.data.login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType =>
    async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(authMe())
        dispatch(actions.loginErrorAC(null))
    } else {
        if (data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaURL())
        }
        dispatch(actions.loginErrorAC(data.messages))
    }
}

export const logoutThunk = (): ThunkType =>
    async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaURL = (): ThunkType =>
    async (dispatch) => {
    const data = await securityAPI.getCaptchaURL()
    const captchaURL = data.url

    dispatch(actions.getCaptchaSuccess(captchaURL))
}

export default authReducer
