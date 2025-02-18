import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '37f538bf-27da-49c7-966d-c187e5d8e553'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    getUsers2(pageNumber, pageSize = 10) {
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    deleteUnfollow(userID) {
        return instance.delete(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },

    postFollow(userID) {
        return instance.post(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },

    getProfile(userID) {
        return instance.get(`profile/${userID}`)
    },
}

export const authAPI = {
    getAuthMe() {
        return instance.get('auth/me')
    },
}