import React from 'react'
import style from './Dialogs.module.css'
import Messages from "./Messages/Messages";
import DialogItems from "./DialogItems/DialogItems";

const Dialogs = (props) => {
    return (
        <div className={style.dialogs}>
            <DialogItems dialogs={props.state.dialogs} />
            <Messages messages={props.state.messages} />
        </div>
    )
}

export default Dialogs