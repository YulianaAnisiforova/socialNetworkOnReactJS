import React from 'react'
import style from './DialogItem.module.css'
import {NavLink} from "react-router-dom";

import userAvatar1 from "./../img/dipper.jpg";
import userAvatar2 from "./../img/stan.webp";
import userAvatar3 from "./../img/wendy.webp";
import userAvatar4 from "./../img/ford.webp";
import userAvatar5 from "./../img/pacifica.jpg";
import userAvatar6 from "./../img/mermando.webp";
import userAvatar7 from "./../img/soos.webp";

const DialogItem = (props) => {

    let usersAvatars = []
    usersAvatars.push(userAvatar1)
    usersAvatars.push(userAvatar2)
    usersAvatars.push(userAvatar3)
    usersAvatars.push(userAvatar4)
    usersAvatars.push(userAvatar5)
    usersAvatars.push(userAvatar6)
    usersAvatars.push(userAvatar7)

    return (
        <div className={style.dialog}>
            <div>
                <img className={style.avatars} src={usersAvatars[props.id-1]} alt="avatar"/>
                {/*<img className={style.avatars} src={`userAvatar${props.id}`} alt="avatar"/>*/}
            </div>
            <NavLink className={navData => navData.isActive ? style.active : style.dialog} to={'/dialogs/' + props.id}>
                {props.user}
            </NavLink>
        </div>
    )
}

export default DialogItem