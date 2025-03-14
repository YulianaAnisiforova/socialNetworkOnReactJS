import axios from 'axios'
import {ProfileType, UserType} from '../types/types'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '37f538bf-27da-49c7-966d-c187e5d8e553'
    }
})

type GetUsersType = {items: Array<UserType>, totalCount: number, error: string}
type FollowUnfollowType = {resultCode: ResultCodesEnum, messages: string[], data:{}}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    getUsers2(pageNumber: number, pageSize: number = 10) {
        return instance.get<GetUsersType>(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    deleteUnfollow(userID: number) {
        return instance.delete<FollowUnfollowType>(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },

    postFollow(userID: number) {
        return instance.post<FollowUnfollowType>(`follow/${userID}`)
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

type UpdateProfileType = {
    data: any,
    resultCode: ResultCodesEnum,
    messages: Array<string>,
}

export const profileAPI = {
    getProfile(userID: number) {
        return instance.get<ProfileType>(`profile/${userID}`)
    },
    getStatus(userID: number) {
        return instance.get<string>(`profile/status/${userID}`)
    },

    updateStatus(status: string) {
        return instance.put<UpdateProfileType>(`profile/status`, {status: status})
    },

    saveAvatar(file: any) {
        let formData = new FormData()
        formData.append('image', file)
        return instance.put<UpdateProfileType>('profile/photo', formData)
            .then(response => response.data)
    },

    saveProfile(profile: ProfileType) {
        return instance.put<UpdateProfileType>(`profile`, profile)
            .then(response => response.data)
    },
}

type CaptchaType = {url:string}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<CaptchaType>('security/get-captcha-url')
            .then(response => response.data)
    },
}