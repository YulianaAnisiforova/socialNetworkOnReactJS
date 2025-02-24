import React from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import {useForm} from 'react-hook-form'

const Dialogs = (props) => {
    let dialogsElements = props.dialogs.map(
        dialog => <DialogItem key={dialog.id} user={dialog.name} id={dialog.id} avatar={dialog.avatar}/>)

    let messagesElements = props.messages.map(
        message => <MessageItem key={message.id} message={message.message}/>)

    let sendNewMessage = (newMsg) => {
        props.sendMessage(newMsg)
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogItems}>
                {dialogsElements}
            </div>

            <div className={style.messagesItems}>
                <div className={style.messages}>
                    {messagesElements}
                </div>

                <SendMessageForm onSubmitContainer={sendNewMessage} />
            </div>

        </div>
    )
}

const SendMessageForm = (props) => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const onSubmit = (data) => {
        props.onSubmitContainer(data.newMsg)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.newMessage}>
                    <textarea className={style.newMessageArea}
                              placeholder='New message'
                              {...register('newMsg',)} />
            <button type={'submit'}
                    className={style.newMessageBtn}>Send</button>
        </form>
    )
}

export default Dialogs
