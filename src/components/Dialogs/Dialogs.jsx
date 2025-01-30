import React from 'react'
import style from './Dialogs.module.css'
import Messages from "./Messages/Messages";
import DialogItems from "./DialogItems/DialogItems";

const Dialogs = () => {
    return (
        <div className={style.dialogs}>
            <DialogItems/>
            <Messages/>
        </div>
    )
}

export default Dialogs