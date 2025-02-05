import React from 'react'
import style from './Message.module.css'

const Message = (props) => {
    return (
        <div className={style.message}>
            <span>
                {props.message}
            </span>
        </div>
    )
}

export default Message