import {UserType} from '../types/types'
import {instance, APIResponseType} from './api'

type GetUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null,
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '', user: null | boolean = null) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` +
            (user === null ? '' : `&friend=${user}`))
            .then(response => response.data)
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
