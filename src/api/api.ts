// import axios from 'axios'
import {ProfileType} from '../types/types'
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '37f538bf-27da-49c7-966d-c187e5d8e553'
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    getUsers2(pageNumber: number, pageSize: number = 10) {
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    deleteUnfollow(userID: number) {
        return instance.delete(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },

    postFollow(userID: number) {
        return instance.post(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },
}

export enum ResultCodesEnum {
    Success= 0,
    Error= 1,
    CaptchaIsRequired = 10,
}

type MeResponseType = {
    data: {id: number, email: string, login: string},
    resultCode: ResultCodesEnum,
    messages: Array<string>,
}

type LoginResponseType = {
    data: {userId: number},
    resultCode: ResultCodesEnum,
    messages: Array<string>,
}

export const authAPI = {
    getAuthMe() {
        return instance.get<MeResponseType>('auth/me')
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },

    logout() {
        return instance.delete('auth/login')
    },
}

export const profileAPI = {
    getProfile(userID: number) {
        return instance.get(`profile/${userID}`)
    },
    getStatus(userID: number) {
        return instance.get(`profile/status/${userID}`)
    },

    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },

    saveAvatar(file: any) {
        let formData = new FormData()
        formData.append('image', file)
        return instance.put('profile/photo', formData)
            .then(response => response.data)
    },

    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
            .then(response => response.data)
    },
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get('security/get-captcha-url')
            .then(response => response.data)
    },
}