const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
    posts: [
        {
            id: 3,
            message: 'I`m going to visit my gruncle Stan again this summer OMG soooo excited!! Looking forward to meet him again!!!!!',
            likes: '1488'
        },
        {id: 2, message: 'My brother Dipper is sooooo annoying', likes: '2'},
        {
            id: 1, message: 'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la', likes: '0'
        },
        {id: 0, message: 'Hello everyone it`s my first post here haha', likes: '7'},
    ],
    newPostText: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [{id: state.posts.length, message: state.newPostText, likesCount: 0,}, ...state.posts],
                newPostText: '',
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            }
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}

export default profileReducer