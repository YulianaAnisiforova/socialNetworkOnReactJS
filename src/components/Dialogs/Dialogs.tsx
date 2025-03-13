import React from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import {useForm} from 'react-hook-form'
import {DialogType, MessageType} from '../../types/types'

type PropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    sendMessage: (newMsg: string) => void,
}

const Dialogs: React.FC<PropsType> = (props) => {
    let dialogsElements = props.dialogs.map(
        dialog => <DialogItem key={dialog.id} user={dialog.name} id={dialog.id} avatar={dialog.avatar}/>)

    let messagesElements = props.messages.map(
        message => <MessageItem key={message.id} message={message.message}/>)

    let sendNewMessage = (newMsg: string) => {
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

type SendMessageFormType = {
    onSubmitContainer: (newMsg: string) => void,

}

const SendMessageForm: React.FC<SendMessageFormType> = (props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            isValid,
        },
    } = useForm()

    const onSubmit = (data: any) => {
        props.onSubmitContainer(data.newMsg)
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
