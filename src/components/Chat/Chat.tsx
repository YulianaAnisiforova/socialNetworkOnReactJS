import React, {useEffect, useState} from 'react'
import {ChatMessageType} from "../../types/types";
import style from "./Chat.module.css";
import {ArrowUpOutlined} from "@ant-design/icons";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const Chat: React.FC = () => {
    return (
        <div>
            <Messages/>
            <SendMessageToChatForm/>
        </div>
    )
}

export const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (event) => {
            let newMsg = JSON.parse(event.data)
            setMessages((prevMessages) => [...prevMessages, ...newMsg])
        })
    }, [])

    return (
        <div className={style.messagesBox}>
            {messages.map((message: ChatMessageType) => {
                return <MsgItem key={message.userId}
                                message={message}/>
            })}
        </div>
    )
}

export const MsgItem: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div className={style.msgItemBox}>
            <img className={style.avatar} src={message.photo} alt="avatar"/> <b> {message.userName} </b>
            : {message.message}
        </div>
    )
}

export const SendMessageToChatForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const onSendBtn = () => {
        if (!message) return
        ws.send(message)
        setMessage('')
    }

    return (
        <div className={style.sendMessageToChat}>
            <span>
                <input type='text' className={style.newMessageInput}
                       value={message}
                       onChange={(event) => setMessage(event.currentTarget.value)}/>
            </span>
            <span>
                <button className={style.sendBtn} onClick={onSendBtn}><ArrowUpOutlined/></button>
            </span>
        </div>
    )
}


export default Chat