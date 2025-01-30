import React from 'react'
import style from './NavBar.module.css'
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className={style.nav}>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/profile'> Profile </NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/dialogs'> Messages </NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/news'> News </NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/music'> Music </NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/settings'> Settings </NavLink>
            </div>
        </nav>
    )
}

export default NavBar