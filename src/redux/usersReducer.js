// const SHOW_MORE = 'SHOW-MORE'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

let initialState = {
    users: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userID) {
                        return {...user, followed: true}
                    }
                    return user
                }),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userID) {
                        return {...user, followed: false}
                    }
                    return user
                }),
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users],
            }
        default:
            return state
    }
}


export const followActionCreator = (id) => ({type: FOLLOW, userID: id})

export const unFollowActionCreator = (id) => ({type: UNFOLLOW, userID: id})

export const setUsersActionCreator = (users) => ({type: SET_USERS, users: users})

export default usersReducer
