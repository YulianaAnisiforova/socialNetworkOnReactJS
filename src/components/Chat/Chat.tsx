import React, {useEffect, useRef, useState} from 'react'
import {ChatMessageType} from '../../types/types'
import style from './Chat.module.css'
import {ArrowUpOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {sendMessageToChatThunk, startMessagesListeningThunk, stopMessagesListeningThunk} from '../../redux/chatReducer'
import {AppStateType} from '../../redux/store'

const Chat: React.FC = () => {
    const dispatch = useDispatch<any>()
    const status = useSelector((state: AppStateType) => state.chatPage.status)

    useEffect(() => {
        dispatch(startMessagesListeningThunk())
        return () => {
            dispatch(stopMessagesListeningThunk())
        }
    }, []);

    return (
        <div>
            {status === 'error' ? <div>Error. please refresh the page</div> :
                <>
                    <Messages/>
                    <SendMessageToChatForm/>
                </>
            }
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chatPage.messages)
    const autoScrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        autoScrollRef.current?.scrollIntoView({behavior: 'smooth'})

    }, [messages])

    return (
        <div className={style.messagesBox}>
            {messages.map((message: ChatMessageType, index) => {
                return <MsgItem key={index}
                                message={message}/>
            })}
                <div ref={autoScrollRef} />
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

const SendMessageToChatForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chatPage.status)
    const dispatch = useDispatch<any>()

    const onSendBtn = () => {
        if (!message) return
        dispatch(sendMessageToChatThunk(message))
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
                <button className={style.sendBtn}
                        disabled={status !== 'ready'}
                        onClick={onSendBtn}>
                    <ArrowUpOutlined/>
                </button>
            </span>
        </div>
    )
}


export default Chat
