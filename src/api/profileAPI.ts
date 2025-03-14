import {ProfileType} from '../types/types'
import {instance, ResultCodesEnum} from './api'

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
