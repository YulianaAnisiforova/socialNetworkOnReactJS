import React from 'react'
import style from './DialogItems.module.css'
import DialogItem from "./DialogItem/DialogItem";

const DialogItems = (props) => {

    let dialogsElements = props.dialogs.map(
        dialog => <DialogItem user={dialog.name} id={dialog.id}/>)

    return (
        <div className={style.dialogItems}>
            {dialogsElements}
        </div>
    )
}

export default DialogItems