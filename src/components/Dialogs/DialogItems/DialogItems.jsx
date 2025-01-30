import React from 'react'
import style from './DialogItems.module.css'
import DialogItem from "./DialogItem/DialogItem";

const DialogItems = () => {
    return (
        <div className={style.dialogItems}>
            <div>
                <DialogItem user='Dipper Pines' id='1'/>
            </div>
            <div>
                <DialogItem user='Stan Pines' id='2'/>
            </div>
            <div>
                <DialogItem user='Wendy Corduroy' id='3'/>
            </div>
            <div>
                <DialogItem user='Ford Pines' id='4'/>
            </div>
            <div>
                <DialogItem user='Pacifica Northwest' id='5'/>
            </div>
            <div>
                <DialogItem user='Mermando' id='6'/>
            </div>
            <div>
                <DialogItem user='Soos Ramirez' id='7'/>
            </div>
        </div>
    )
}

export default DialogItems