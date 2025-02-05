import React from 'react'
import style from './MessagesItems.module.css'
import NewMessage from "./NewMessage/NewMessage";
import Messages from "./Messages/Messages";

const MessagesItems = (props) => {
    return (
        <div className={style.messagesItems}>
            <Messages messages={props.messages}/>
            <NewMessage/>
        </div>
    )
}

export default MessagesItems