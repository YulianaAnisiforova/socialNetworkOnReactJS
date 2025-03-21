import {instance, APIResponseType} from './api'

type GetAuthDataType = {
    id: number,
    email: string,
    login: string,
}

type LoginDataType = {
    userId: number,
}

export const authAPI = {
    authorizeMeAPI() {
        return instance.get<APIResponseType<GetAuthDataType>>('auth/me')
            .then(response => response.data)
    },

    loginAPI(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginDataType>>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },

    logoutAPI() {
        return instance.delete<APIResponseType>('auth/login')
            .then(response => response.data)
    },
}
