import React from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/store'
import {actions} from '../../redux/dialogsReducer'

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

const SendMessageForm = () => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            isValid,
        },
    } = useForm()

    const onSubmit = (data: any) => {
        dispatch(actions.sendMessageActionCreator(data.newMsg))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.newMessage}>
                    <textarea className={style.newMessageArea}
                              placeholder='New message'
                              {...register('newMsg', {
                                  required: true,
                              })} />
            <button type={'submit'} disabled={!isValid}
                    className={style.newMessageBtn}>Send</button>
        </form>
    )
}

export default Dialogs
