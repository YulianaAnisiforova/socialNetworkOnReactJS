import React from 'react'
import {
    sendMessageActionCreator,
    updateNewMessageActionCreator,
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    let onSendBtnClick = () => {
        props.dispatch(sendMessageActionCreator())
    }

    let onMessageChange = (body) => {
        props.dispatch(updateNewMessageActionCreator(body))
    }

    return (
        <Dialogs updateNewMessage={onMessageChange}
                 sendMessage={onSendBtnClick}
                 newMessageText={props.dialogsPage.newMessageText}
                 dialogs={props.dialogsPage.dialogs}
                 messages={props.dialogsPage.messages}/>
    )
}

export default DialogsContainer
