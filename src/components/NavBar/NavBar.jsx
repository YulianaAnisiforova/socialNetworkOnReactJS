import React from 'react'
import style from './NavBar.module.css'

const NavBar = () => {
    return (
        <nav className={style.nav}>
            <div className={style.item}>
                <a className={style.link} href='/profile'> Profile </a>
            </div>
            <div className={style.item}>
                <a className={style.link} href='/dialogs'> Messages </a>
            </div>
            <div className={style.item}>
                <a className={style.link} href='/news'> News </a>
            </div>
            <div className={style.item}>
                <a className={style.link} href='/music'> Music </a>
            </div>
            <div className={style.item}>
                <a className={style.link} href='/settings'> Settings </a>
            </div>
        </nav>)
}

export default NavBar