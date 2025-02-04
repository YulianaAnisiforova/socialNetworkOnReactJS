const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let store = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: 0,
                    message: 'I`m going to visit my gruncle Stan again this summer OMG soooo excited!! Looking forward to meet him again!!!!!',
                    likes: '1488'
                },
                {id: 1, message: 'My brother Dipper is sooooo annoying', likes: '2'},
                {
                    id: 2, message: 'la la la la la la la la la la la la la la la la\n' +
                        'la la la la la la la la la la la la la la la la\n' +
                        'la la la la la la la la la la la la la la la la\n' +
                        'la la la la la la la la la la la la la la la la\n' +
                        'la la la la la la la la la la la la la la la la\n' +
                        'la la la la la la la la la la la la la la la la\n' +
                        'la la la la la la la la la la la la la la la la\n' +
                        'la la la la la la la la la la la la la la la la', likes: '0'
                },
                {id: 3, message: 'Hello everyone it`s my first post here haha', likes: '7'},
            ],
            newPostText: '',
        },

        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dipper Pines',},
                {id: 2, name: 'Stan Pines',},
                {id: 3, name: 'Wendy Corduroy',},
                {id: 4, name: 'Ford Pines',},
                {id: 5, name: 'Pacifica Northwest',},
                {id: 6, name: 'Mermando',},
                {id: 7, name: 'Soos Ramirez',},
            ],

            messages: [
                {id: 1, message: 'Hi!',},
                {id: 2, message: 'How are you?',},
                {id: 3, message: 'I`m pretty good',},
            ],
        },
    },

    _callSubscriber() {
        console.log('state was changed')
    },

    getState () {
        return this._state
    },

    subscribe (observer) {
        this._callSubscriber = observer
    },

    dispatch (action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0,
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''

            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber(this._state)
        }
    },
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}

export default store