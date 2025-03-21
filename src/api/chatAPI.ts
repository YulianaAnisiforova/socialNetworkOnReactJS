import {ChatMessageType} from '../types/types'

type SubscriberType = (messages: ChatMessageType[]) => void

let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null

export const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

export const messageHandler = (event: MessageEvent) => {
    const newMsg = JSON.parse(event.data)
    subscribers.forEach(s => s(newMsg))
}

export const createChannel = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
}

export const chatAPI = {
    startAPI() {
        createChannel()
    },

    stopAPI() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },

    subscribeAPI(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },

    unsubscribeAPI(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },

    sendMessageToChatAPI(message: string) {
        ws?.send(message)
    },
}
