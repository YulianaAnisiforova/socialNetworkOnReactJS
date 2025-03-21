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
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>

const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        case 'LOGIN_ERROR':
            return {...state, loginError: action.loginError}
        case 'GET_CAPTCHA':
            return {...state, captchaURL: action.payload.captchaURL}
        default:
            return state
    }
}

export const actions = {
    setAuthUserDataAC: (userID: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {userID, email, login, isAuth}
    } as const),
    getCaptchaAC: (captchaURL: string) => ({type: 'GET_CAPTCHA', payload: {captchaURL}} as const),
    loginErrorAC: (loginError: Array<string> | null) => ({type: 'LOGIN_ERROR', loginError: loginError} as const),
}

export const authorizeMeThunk = (): ThunkType =>
    async (dispatch) => {
    let data = await authAPI.authorizeMeAPI()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserDataAC(data.data.id,
            data.data.email, data.data.login, true))
    }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType =>
    async (dispatch) => {
    let data = await authAPI.loginAPI(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(authorizeMeThunk())
        dispatch(actions.loginErrorAC(null))
    } else {
        if (data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaThunk())
        }
        dispatch(actions.loginErrorAC(data.messages))
    }
}

export const logoutThunk = (): ThunkType =>
    async (dispatch) => {
    let data = await authAPI.logoutAPI()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserDataAC(null, null, null, false))
    }
}

export const getCaptchaThunk = (): ThunkType =>
    async (dispatch) => {
    const data = await securityAPI.getCaptchaAPI()
    const captchaURL = data.url

    dispatch(actions.getCaptchaAC(captchaURL))
}

export default authReducer
