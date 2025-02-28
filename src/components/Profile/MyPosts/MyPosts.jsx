import React from 'react'
import style from './MyPosts.module.css'
import Post from './Post/Post'
import {useForm} from 'react-hook-form'

const MyPosts = React.memo(props => {

    let postsElements = props.posts.map(
        post => <Post key={post.id} message={post.message} likes={post.likes}/>)

    let addNewPost = (newPost) => {
        props.addPost(newPost)
    }

    return (
        <div className={style.postsWrapper}>

            <AddNewPostForm onSubmitContainer={addNewPost}/>

            <div className={style.posts}>
                {postsElements}
            </div>

        </div>
    )
})

const AddNewPostForm = (props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            isValid,
        },
    } = useForm()

    const onSubmit = (data) => {
        props.onSubmitContainer(data.newPost)
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