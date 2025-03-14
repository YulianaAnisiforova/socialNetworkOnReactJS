import {instance, ResultCodesEnum} from './api'

type GetAuthType = {
    data: {id: number, email: string, login: string},
    resultCode: ResultCodesEnum,
    messages: Array<string>,
}

type LoginType = {
    data: {userId: number},
    messages: Array<string>,
    resultCode: ResultCodesEnum,
}
type LogoutType = {
    data: {},
    messages:Array<string>,
    resultCode: ResultCodesEnum,
}

export const authAPI = {
    getAuthMe() {
        return instance.get<GetAuthType>('auth/me')
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<LoginType>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },

    logout() {
        return instance.delete<LogoutType>('auth/login')
    },
}
