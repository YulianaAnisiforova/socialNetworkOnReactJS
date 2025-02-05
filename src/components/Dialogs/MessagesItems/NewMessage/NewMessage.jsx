import React from 'react'
import style from './NewMessage.module.css'

const NewMessage = (props) => {
    return (
        <div className={style.newMessage}>
            <textarea className={style.newMessageArea} cols="70" rows="1" placeholder='New message'/>
            <button className={style.newMessageBtn}>Send</button>
        </div>
    )
}

export default NewMessage