import userAvatar1 from "./../img/dipper.jpg";
import userAvatar2 from "./../img/stan.webp";
import userAvatar3 from "./../img/wendy.webp";
import userAvatar4 from "./../img/ford.webp";
import userAvatar5 from "./../img/pacifica.jpg";
import userAvatar6 from "./../img/mermando.webp";
import userAvatar7 from "./../img/soos.webp";

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogs: [
        {id: 1, name: 'Dipper Pines', avatar: userAvatar1, },
        {id: 2, name: 'Stan Pines', avatar: userAvatar2, },
        {id: 3, name: 'Wendy Corduroy', avatar: userAvatar3, },
        {id: 4, name: 'Ford Pines', avatar: userAvatar4, },
        {id: 5, name: 'Pacifica Northwest', avatar: userAvatar5, },
        {id: 6, name: 'Mermando', avatar: userAvatar6, },
        {id: 7, name: 'Soos Ramirez', avatar: userAvatar7, },
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