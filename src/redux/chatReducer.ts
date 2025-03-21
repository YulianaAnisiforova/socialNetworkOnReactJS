import {BaseThunkType, InferActionType} from './store'
import {chatAPI, createChannel} from '../api/chatAPI'
import {ChatMessageType} from '../types/types'
import {Dispatch} from 'redux'

let initialState = {
    messages: [] as ChatMessageType[],
}

export type InitialStateType = typeof initialState
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>

const chatReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'RECEIVED_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}

export const actions = {
    receivedMessagesAC: (messages: ChatMessageType[]) => ({type: 'RECEIVED_MESSAGES', payload: {messages}} as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.receivedMessagesAC(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListeningThunk = (): ThunkType =>
    async (dispatch) => {
        chatAPI.startAPI()
        chatAPI.subscribeAPI(newMessageHandlerCreator(dispatch))
    }

export const stopMessagesListeningThunk = (): ThunkType =>
    async (dispatch) => {
        chatAPI.unsubscribeAPI(newMessageHandlerCreator(dispatch))
        chatAPI.stopAPI()
    }

export const sendMessageToChatThunk = (message: string): ThunkType =>
    async (dispatch) => {
        chatAPI.sendMessageToChatAPI(message)
    }

export default chatReducer
