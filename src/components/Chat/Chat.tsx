import React, {useEffect, useState} from 'react'
import {ChatMessageType} from "../../types/types";
import style from "./Chat.module.css";
import {ArrowUpOutlined} from "@ant-design/icons";

const Chat: React.FC = () => {
    const [wsChannel, setWS] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket

        let closeHandler = () => {
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws?.addEventListener('close', closeHandler)
            setWS(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, []);

    useEffect(() => {

    }, [wsChannel]);

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <SendMessageToChatForm wsChannel={wsChannel}/>
        </div>
    )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (event: MessageEvent) => {
            let newMsg = JSON.parse(event.data)
            setMessages((prevMessages) => [...prevMessages, ...newMsg])
        }

        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

    return (
        <div className={style.messagesBox}>
            {messages.map((message: ChatMessageType, index) => {
                return <MsgItem key={index}
                                message={message}/>
            })}
        </div>
    )
}

const MsgItem: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div className={style.msgItemBox}>
            <img className={style.avatar} src={message.photo} alt="avatar"/> <b> {message.userName} </b>
            : {message.message}
        </div>
    )
}

const SendMessageToChatForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {

        let openHandler = () => {
            setReadyStatus('ready')
        }

        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel]);

    const onSendBtn = () => {
        if (!message) return
        wsChannel?.send(message)
        setMessage('')
    }

    return (
        <div className={style.sendMessageToChat}>
            <span>
                <input type='text' className={style.newMessageInput}
                       value={message}
                       onChange={(event) =>
                           setMessage(event.currentTarget.value)}/>
            </span>
            <span>
                <button disabled={wsChannel !== null && readyStatus !== 'ready'}
                        className={style.sendBtn} onClick={onSendBtn}>
                    <ArrowUpOutlined/>
                </button>
            </span>
        </div>
    )
}


export default Chat