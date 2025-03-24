import {BaseThunkType, InferActionType} from './store'
import {chatAPI} from '../api/chatAPI'
import {ChatMessageType, ChatStatusType} from '../types/types'
import {Dispatch} from 'redux'

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as ChatStatusType
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
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status,
            }
        default:
            return state
    }
}

export const actions = {
    receivedMessagesAC: (messages: ChatMessageType[]) => ({type: 'RECEIVED_MESSAGES', payload: {messages}} as const),
    setStatusAC: (status: ChatStatusType) => ({type: 'SET_STATUS', status} as const),
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

let _statusChangingHandler: ((status: ChatStatusType) => void) | null = null
const statusChangingHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangingHandler === null) {
        _statusChangingHandler = (status) => {
            dispatch(actions.setStatusAC(status))
        }
    }
    return _statusChangingHandler
}

export const startMessagesListeningThunk = (): ThunkType =>
    async (dispatch) => {
        chatAPI.startAPI()
        chatAPI.subscribeAPI('messages-received', newMessageHandlerCreator(dispatch))
        chatAPI.subscribeAPI('status-changed', statusChangingHandlerCreator(dispatch))
    }

export const stopMessagesListeningThunk = (): ThunkType =>
    async (dispatch) => {
        chatAPI.unsubscribeAPI('messages-received', newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribeAPI('status-changed', statusChangingHandlerCreator(dispatch))
        chatAPI.stopAPI()
    }

export const sendMessageToChatThunk = (message: string): ThunkType =>
    async (dispatch) => {
        chatAPI.sendMessageToChatAPI(message)
    }

export default chatReducer
