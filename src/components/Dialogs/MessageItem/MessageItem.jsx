import React from 'react'
import style from './MessageItem.module.css'

const MessageItem = (props) => {
    return (
        <div className={style.message}>
            <span>
                {props.message}
            </span>
        </div>
    )
}

export default MessageItem