import userAvatar1 from './../img/dipper.jpg'
import userAvatar2 from './../img/stan.webp'
import userAvatar3 from './../img/wendy.webp'
import userAvatar4 from './../img/ford.webp'
import userAvatar5 from './../img/pacifica.jpg'
import userAvatar6 from './../img/mermando.webp'
import userAvatar7 from './../img/soos.webp'

const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogs: [
        {id: 0, name: 'Dipper Pines', avatar: userAvatar1,},
        {id: 1, name: 'Stan Pines', avatar: userAvatar2,},
        {id: 2, name: 'Wendy Corduroy', avatar: userAvatar3,},
        {id: 3, name: 'Ford Pines', avatar: userAvatar4,},
        {id: 4, name: 'Pacifica Northwest', avatar: userAvatar5,},
        {id: 5, name: 'Mermando', avatar: userAvatar6,},
        {id: 6, name: 'Soos Ramirez', avatar: userAvatar7,},
    ],

    messages: [
        {id: 0, message: 'Hi!',},
        {id: 1, message: 'How are you?',},
        {id: 2, message: 'I`m pretty good',},
    ],
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: state.messages.length, message: action.newMsg}],
            }
        default:
            return state
    }

}

export const sendMessageActionCreator = (newMsg) => ({type: SEND_MESSAGE, newMsg})

export default dialogsReducer