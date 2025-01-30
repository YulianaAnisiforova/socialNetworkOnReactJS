import React from 'react'
import style from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const Dialogs = () => {
    return (
        <div className={style.dialogs}>
            <div className={style.dialogItems}>
                <div className={style.dialog + ' ' + style.active}>
                    <NavLink className={navData => navData.isActive ? style.active : style.dialog} to='/dialogs/1'>Dipper Pines</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink className={navData => navData.isActive ? style.active : style.dialog} to='/dialogs/2'>Stan Pines</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink className={navData => navData.isActive ? style.active : style.dialog} to='/dialogs/3'>Wendy Corduroy</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink className={navData => navData.isActive ? style.active : style.dialog} to='/dialogs/4'>Ford Pines</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink className={navData => navData.isActive ? style.active : style.dialog} to='/dialogs/5'>Pacifica Northwest</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink className={navData => navData.isActive ? style.active : style.dialog} to='/dialogs/6'>Mermando</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink className={navData => navData.isActive ? style.active : style.dialog} to='/dialogs/7'>Soos Ramirez</NavLink>
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