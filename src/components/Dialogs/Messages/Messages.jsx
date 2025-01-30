import React from 'react'
import style from './Messages.module.css'
import Message from "./Message/Message";

const Messages = () => {
    let messagesData = [
        {id: 1, message: 'Hi!',},
        {id: 2, message: 'How are you?',},
        {id: 3, message: 'I`m pretty good',},
    ]

    let messagesElements = messagesData.map(
        message => <Message message={message.message}/>)

    return (
        <div className={style.messages}>
            {messagesElements}
        </div>
    )
}

export default Messages