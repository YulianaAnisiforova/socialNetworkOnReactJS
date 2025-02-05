const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const SEND_MESSAGE = 'SEND-MESSAGE'

const dialogsReducer = (state, action) => {
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

export default dialogsReducer