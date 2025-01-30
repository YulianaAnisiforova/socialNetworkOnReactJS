import React from 'react'
import style from './DialogItem.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={style.dialog}>
            <NavLink className={navData => navData.isActive ? style.active : style.dialog} to={'/dialogs/' + props.id}>
                {props.user}
            </NavLink>
        </div>
    )
}

export default DialogItem