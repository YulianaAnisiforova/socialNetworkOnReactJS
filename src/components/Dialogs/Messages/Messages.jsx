import React from 'react'
import style from './Messages.module.css'
import Message from "./Message/Message";

const Messages = (props) => {

    let messagesElements = props.messages.map(
        message => <Message message={message.message}/>)

    return (
        <div className={style.messagesSide}>

            <div className={style.messages}>
                {messagesElements}
            </div>

            <div className={style.newMessage}>
                <textarea className={style.newMessageArea} cols="70" rows="1" placeholder='New message' />
                <button className={style.newMessageBtn}>Send</button>
            </div>

        </div>
    )
}

export default Messages