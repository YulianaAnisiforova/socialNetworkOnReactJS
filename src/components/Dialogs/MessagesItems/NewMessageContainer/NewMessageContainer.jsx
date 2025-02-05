import React from 'react'
import {
    sendMessageActionCreator,
    updateNewMessageActionCreator,
} from "../../../../redux/dialogsReducer";
import NewMessage from "./NewMessage/NewMessage";

const NewMessageContainer = (props) => {
    let onSendBtnClick = () => {
        props.dispatch(sendMessageActionCreator())
    }

    let onMessageChange = (body) => {
        props.dispatch(updateNewMessageActionCreator(body))
    }

    return (
        <NewMessage updateNewMessage={onMessageChange}
                    sendMessage={onSendBtnClick}
                    newMessageText={props.newMessageText}/>
    )
}

export default NewMessageContainer
