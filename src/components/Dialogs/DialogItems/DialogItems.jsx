import React from 'react'
import style from './DialogItems.module.css'
import DialogItem from "./DialogItem/DialogItem";

const DialogItems = () => {
    let dialogsData = [
        {id: 1, name: 'Dipper Pines',},
        {id: 2, name: 'Stan Pines',},
        {id: 3, name: 'Wendy Corduroy',},
        {id: 4, name: 'Ford Pines',},
        {id: 5, name: 'Pacifica Northwest',},
        {id: 6, name: 'Mermando',},
        {id: 7, name: 'Soos Ramirez',},
    ]

    let dialogsElements = dialogsData.map(
        dialog => <DialogItem user={dialog.name} id={dialog.id}/>)

    return (
        <div className={style.dialogItems}>
            {dialogsElements}
        </div>
    )
}

export default DialogItems