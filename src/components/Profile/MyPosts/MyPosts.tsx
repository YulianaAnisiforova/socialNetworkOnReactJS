import React from 'react'
import style from './MyPosts.module.css'
import Post from './Post/Post'
import {useForm} from 'react-hook-form'
import {PostType} from '../../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../../redux/store'
import {actions} from '../../../redux/profileReducer'

const MyPosts = React.memo(() => {
    const posts: Array<PostType> = useSelector((state: AppStateType) => state.profilePage.posts)

    let postsElements = posts.map(
        post => <Post key={post.id} message={post.message} likes={post.likes}/>)

    return (
        <div className={style.postsWrapper}>

            <AddNewPostForm />

            <div className={style.posts}>
                {postsElements}
            </div>

        </div>
    )
})

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

export default MyPosts