import {PhotosType, ProfileType} from '../types/types'
import {instance, APIResponseType} from './api'

type SaveAvatarDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userID: number | null) {
        return instance.get<ProfileType>(`profile/${userID}`)
            .then(response => response.data)
    },
    getStatus(userID: number) {
        return instance.get<string>(`profile/status/${userID}`)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status})
            .then(response => response.data)
    },

    saveAvatar(file: any) {
        let formData = new FormData()
        formData.append('image', file)
        return instance.put<APIResponseType<SaveAvatarDataType>>('profile/photo', formData)
            .then(response => response.data)
    },

    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile)
            .then(response => response.data)
    },
}
