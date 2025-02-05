import React from 'react'
import style from './NewMessage.module.css'
import {
    sendMessageActionCreator,
    updateNewMessageActionCreator,
} from "../../../../redux/state";

const NewMessage = (props) => {
    // let newMessageElement = React.createRef()

    let onSendBtnClick = () => {
        props.dispatch(sendMessageActionCreator())
    }

    let onMessageChange = (event) => {
        let body = event.target.value
        props.dispatch(updateNewMessageActionCreator(body))
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
