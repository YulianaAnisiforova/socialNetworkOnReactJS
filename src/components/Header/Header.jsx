import React from 'react'
import style from './Header.module.css'

const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.logoContainer}>
                <img src="https://www.seekpng.com/png/full/6-64737_orange-clipart-speech-bubble-bubble-chat-png.png" alt="logo"/>
            </div>
        </header>)
}

export default Header