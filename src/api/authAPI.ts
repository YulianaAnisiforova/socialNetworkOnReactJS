import {instance, ResponseType} from './api'

type GetAuthDataType = {
    id: number,
    email: string,
    login: string,
}

type LoginDataType = {
    userId: number,
}

export const authAPI = {
    getAuthMe() {
        return instance.get<ResponseType<GetAuthDataType>>('auth/me')
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginDataType>>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },

    logout() {
        return instance.delete<ResponseType>('auth/login')
            .then(response => response.data)
    },
}
