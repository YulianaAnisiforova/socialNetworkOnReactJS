import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

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
            newMessageText: '',
        },
    },

    _callSubscriber() {
        console.log('state was changed')
    },

    getState() {
        return this._state
    },

    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

        this._callSubscriber(this._state)
    },
}

export default store