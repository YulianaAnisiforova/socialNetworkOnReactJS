import React from 'react'
import style from './DialogItems.module.css'
import DialogItem from "./DialogItem/DialogItem";

const DialogItems = ({dialogs}) => {
debugger
    let dialogsElements = dialogs.map(
        dialog => <DialogItem user={dialog.name} id={dialog.id} avatar={dialog.avatar} />)

    return (
        <div className={style.dialogItems}>
            {dialogsElements}
        </div>
    )
}

export default DialogItems