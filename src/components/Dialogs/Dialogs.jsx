import React from 'react'
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = (props) => {
    let dialogsElements = props.dialogs.map(
        dialog => <DialogItem user={dialog.name} id={dialog.id} avatar={dialog.avatar}/>)

    let messagesElements = props.messages.map(
        message => <MessageItem message={message.message}/>)

    let onSendBtnClick = () => {
        props.sendMessage()
    }

    let onMessageChange = (event) => {
        let body = event.target.value
        props.updateNewMessage(body)
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogItems}>
                {dialogsElements}
            </div>

            <div className={style.messagesItems}>
                <div className={style.messages}>
                    {messagesElements}
                </div>

                <div className={style.newMessage}>
                    <textarea className={style.newMessageArea} cols="70" rows="1"
                        placeholder='New message'
                        onChange={onMessageChange} value={props.newMessageText}/>
                    <button onClick={onSendBtnClick} className={style.newMessageBtn}>Send</button>
                </div>
            </div>

        </div>
    )
}

export default Dialogs
