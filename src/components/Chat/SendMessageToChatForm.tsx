import React, {useState} from 'react'
import style from './Chat.module.css'
import {ArrowUpOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {sendMessageToChatThunk} from '../../redux/chatReducer'
import {AppStateType} from '../../redux/store'

export const SendMessageToChatForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chatPage.status)
    const dispatch = useDispatch<any>()

    const onSendBtn = () => {
        if (!message) return
        dispatch(sendMessageToChatThunk(message))
        setMessage('')
    }

    return (
        <div className={style.sendMessageToChat}>
            <span>
                <input type='text' className={style.newMessageInput}
                       value={message}
                       onChange={(event) =>
                           setMessage(event.currentTarget.value)}/>
            </span>
            <span>
                <button className={style.sendBtn}
                        disabled={status !== 'ready'}
                        onClick={onSendBtn}>
                    <ArrowUpOutlined/>
                </button>
            </span>
        </div>
    )
}
