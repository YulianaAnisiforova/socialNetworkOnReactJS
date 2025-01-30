import React from 'react'
import style from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={style.dialog + ' ' + style.active}>
            <NavLink className={navData => navData.isActive ? style.active : style.dialog} to={'/dialogs/' + props.id}>
                {props.user}
            </NavLink>
        </div>
    )
}

const Dialogs = () => {
    return (
        <div className={style.dialogs}>
            <div className={style.dialogItems}>
                <div className={style.dialog + ' ' + style.active}>
                    <DialogItem user='Dipper Pines' id='1' />
                </div>
                <div className={style.dialog}>
                    <DialogItem user='Stan Pines' id='2' />
                </div>
                <div className={style.dialog}>
                    <DialogItem user='Wendy Corduroy' id='3' />
                </div>
                <div className={style.dialog}>
                    <DialogItem user='Ford Pines' id='4' />
                </div>
                <div className={style.dialog}>
                    <DialogItem user='Pacifica Northwest' id='5' />
                </div>
                <div className={style.dialog}>
                    <DialogItem user='Mermando' id='6' />
                </div>
                <div className={style.dialog}>
                    <DialogItem user='Soos Ramirez' id='7' />
                </div>
            </div>

            <div className={style.messages}>
                <div className={style.message}>Hi!</div>
                <div className={style.message}>How are you?</div>
                <div className={style.message}>I`m pretty good</div>
            </div>
        </div>
    )
}

export default Dialogs