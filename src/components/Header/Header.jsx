import React from 'react'
import style from './Header.module.css'
import logo from './../../img/logo.png'
import {NavLink} from 'react-router-dom'

const Header = (props) => {
    return (
        <div className={style.header}>
            <div className={style.loginBlock}>
                {props.isAuth ?
                    <div className={style.authInfo}>
                        <div>{props.login}</div>
                        <div>{props.email}</div>
                    </div>
                    : <NavLink className={style.link} to={'/login'}>Login</NavLink>}
            </div>

            <div className={style.logoContainer}>
                <img src={logo} alt="logo"/>
            </div>
        </div>)
}

export default Header