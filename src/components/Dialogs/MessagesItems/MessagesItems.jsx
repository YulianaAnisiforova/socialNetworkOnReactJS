import React from 'react'
import style from './MessagesItems.module.css'
import Messages from "./Messages/Messages";
import NewMessageContainer from "./NewMessageContainer/NewMessageContainer";

const MessagesItems = ({messages, dispatch, newMessageText}) => {
    return (
        <div className={style.messagesItems}>
            <Messages messages={messages}/>
            <NewMessageContainer newMessageText={newMessageText} dispatch={dispatch}/>
        </div>
    )
}

export default MessagesItems