import React, {useEffect, useRef} from 'react'
import {ChatMessageType} from '../../types/types'
import style from './Chat.module.css'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/store'
import {MsgItem} from './MsgItem'

export const Messages: React.FC = () => {
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
