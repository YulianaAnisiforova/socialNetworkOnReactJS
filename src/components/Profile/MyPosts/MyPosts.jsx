import React from 'react'
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import NewPost from "./NewPost/NewPost";

const MyPosts = (props) => {

    let postsElements = props.posts.map(
        post => <Post message={post.message} likes={post.likes}/>)

    return (
        <div className={style.postsContainer}>
            <NewPost addPost={props.addPost}/>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts