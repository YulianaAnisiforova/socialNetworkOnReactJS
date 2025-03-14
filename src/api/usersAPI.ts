import {UserType} from '../types/types'
import {instance, APIResponseType} from './api'

type GetUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null,
}

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
        return instance.delete<APIResponseType>(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },

    postFollow(userID: number) {
        return instance.post<APIResponseType>(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },
}
