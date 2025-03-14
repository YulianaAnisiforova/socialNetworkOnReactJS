import {UserType} from '../types/types'
import {instance, ResultCodesEnum} from './api'

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
