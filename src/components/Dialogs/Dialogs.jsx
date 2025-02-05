import React from 'react'
import style from './Dialogs.module.css'
import MessagesItems from "./MessagesItems/MessagesItems";
import DialogItems from "./DialogItems/DialogItems";

const Dialogs = (props) => {
    return (
        <div className={style.dialogs}>
            <DialogItems dialogs={props.state.dialogs} />
            <MessagesItems messages={props.state.messages} />
        </div>
    )
}

export default Dialogs