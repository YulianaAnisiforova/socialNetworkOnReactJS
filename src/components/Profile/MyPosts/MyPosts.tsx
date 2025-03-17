import React from 'react'
import style from './MyPosts.module.css'
import Post from './Post/Post'
import {PostType} from '../../../types/types'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../../redux/store'
import AddNewPostForm from './AddNewPostForm'

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

export default MyPosts