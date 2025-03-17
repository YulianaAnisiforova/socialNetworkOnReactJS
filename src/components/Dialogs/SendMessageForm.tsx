import React from 'react'
import style from './Dialogs.module.css'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {actions} from '../../redux/dialogsReducer'

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

export default SendMessageForm
