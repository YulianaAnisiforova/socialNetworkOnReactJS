import React from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/store'
import SendMessageForm from './SendMessageForm'

const Dialogs = () => {
    const dialogs = useSelector((state: AppStateType) => state.dialogsPage.dialogs)
    const messages = useSelector((state: AppStateType) => state.dialogsPage.messages)

    let dialogsElements = dialogs.map(
        dialog => <DialogItem key={dialog.id} user={dialog.name} id={dialog.id} avatar={dialog.avatar}/>)

    let messagesElements = messages.map(
        message => <MessageItem key={message.id} message={message.message}/>)

    return (
        <div className={style.dialogs}>
            <div className={style.dialogItems}>
                {dialogsElements}
            </div>

            <div className={style.messagesItems}>
                <div className={style.messages}>
                    {messagesElements}
                </div>

                <SendMessageForm />
            </div>

        </div>
    )
}

export default Dialogs
