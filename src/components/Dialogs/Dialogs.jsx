import React from 'react'
import style from './Dialogs.module.css'
import MessagesItems from "./MessagesItems/MessagesItems";
import DialogItems from "./DialogItems/DialogItems";
import MyPosts from "../Profile/MyPosts/MyPosts";

const Dialogs = (props) => {
    return (
        <div className={style.dialogs}>
            <DialogItems dialogs={props.dialogsPage.dialogs} />
            <MessagesItems messages={props.dialogsPage.messages} newMessageText={props.dialogsPage.newMessageText}
                           dispatch={props.dispatch}/>
        </div>
    )
}

export default Dialogs
