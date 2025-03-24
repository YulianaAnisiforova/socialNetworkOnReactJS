import React from 'react'
import {ChatMessageType} from '../../types/types'
import style from './Chat.module.css'

export const MsgItem: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div className={style.msgItemBox}>
            <img className={style.avatar} src={message.photo} alt="avatar"/> <b> {message.userName} </b>
            : {message.message}
        </div>
    )
}
