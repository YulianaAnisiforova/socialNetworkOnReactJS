const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessage
            break
        case SEND_MESSAGE:
            let body = {
                id: 4,
                message: state.newMessageText,
            }
            state.newMessageText = ''
            state.messages.push(body)
            break
    }

    return state
}

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE})

export const updateNewMessageActionCreator = (body) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newMessage: body
    }
}

export default dialogsReducer