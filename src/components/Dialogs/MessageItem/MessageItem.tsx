import React from 'react'
import style from './MessageItem.module.css'

type PropsType = {
    message: string,
}

const MessageItem: React.FC<PropsType> = (props) => {
    return (
        <div className={style.message}>
            <span>
                {props.message}
            </span>
        </div>
    )
}

export default MessageItem