import React from 'react'
import style from './MyPosts.module.css'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {actions} from '../../../redux/profileReducer'

const AddNewPostForm = () => {
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
        dispatch(actions.addPostActionCreator(data.newPost))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.newPostBox}>
            <textarea className={style.newPostArea} placeholder="How are you?"
                      {...register('newPost', {
                          required: true,
                      })}/>
            <button type={'submit'} disabled={!isValid} className={style.newPostBtn}>Add post</button>
        </form>
    )
}

export default AddNewPostForm