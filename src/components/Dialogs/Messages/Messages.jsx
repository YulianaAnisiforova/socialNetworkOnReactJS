import React from 'react'
import style from './Messages.module.css'
import Message from "./Message/Message";

const Messages = () => {
    return (
            <div className={style.messages}>
                <Message message='Hi!'/>
                <Message message='How are you?'/>
                <Message message='I`m pretty good'/>
            </div>
    )
}

export default Messages