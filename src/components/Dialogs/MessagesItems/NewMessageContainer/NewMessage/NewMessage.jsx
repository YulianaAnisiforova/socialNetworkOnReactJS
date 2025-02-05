import React from 'react'
import style from './NewMessage.module.css'

const NewMessage = (props) => {
    let onSendBtnClick = () => {
        props.sendMessage()
    }

    let onMessageChange = (event) => {
        let body = event.target.value
        props.updateNewMessage(body)
    }

    return (
        <div className={style.newMessage}>
            <textarea className={style.newMessageArea} cols="70" rows="1"
                      placeholder='New message'
                      onChange={onMessageChange} value={props.newMessageText}/>
            <button onClick={onSendBtnClick} className={style.newMessageBtn}>Send</button>
        </div>
    )
}

export default NewMessage
