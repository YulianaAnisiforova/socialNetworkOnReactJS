// import userAvatar1 from '@Avatars/dipper.jpg'
// import userAvatar2 from '@Avatars/stan.webp'
// import userAvatar3 from '@Avatars/wendy.webp'
// import userAvatar4 from '@Avatars/ford.webp'
// import userAvatar5 from '@Avatars/pacifica.jpg'
// import userAvatar6 from '@Avatars/mermando.webp'
// import userAvatar7 from '@Avatars/soos.webp'

const SEND_MESSAGE = 'SEND-MESSAGE'

type DialogType = {
    id: number,
    name: string,
    // avatar: any,
}

type MessageType = {
    id: number,
    message: string,
}

let initialState = {
    dialogs: [
        {id: 0, name: 'Dipper Pines',
            // avatar: userAvatar1,
        },
        {id: 1, name: 'Stan Pines',
            // avatar: userAvatar2,
        },
        {id: 2, name: 'Wendy Corduroy',
            // avatar: userAvatar3,
        },
        {id: 3, name: 'Ford Pines',
            // avatar: userAvatar4,
        },
        {id: 4, name: 'Pacifica Northwest',
            // avatar: userAvatar5,
        },
        {id: 5, name: 'Mermando',
            // avatar: userAvatar6,
        },
        {id: 6, name: 'Soos Ramirez',
            // avatar: userAvatar7,
        },
    ] as Array<DialogType>,

    messages: [
        {id: 0, message: 'Hi!',},
        {id: 1, message: 'How are you?',},
        {id: 2, message: 'I`m pretty good',},
    ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    newMsg: string,
}

export const sendMessageActionCreator = (newMsg: string): SendMessageActionType => ({type: SEND_MESSAGE, newMsg})

export default dialogsReducer