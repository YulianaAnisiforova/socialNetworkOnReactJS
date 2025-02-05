import React from 'react'
import style from './Messages.module.css'
import Message from "./Message/Message";

const Messages = (props) => {

    let messagesElements = props.messages.map(
        message => <Message message={message.message}/>)

    return (
        <div className={style.messages}>
            {messagesElements}
        </div>
    )
}

export default Messages