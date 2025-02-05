import React from 'react'
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import NewPostContainer from "./NewPostContainer/NewPostContainer";

const MyPosts = (props) => {

    let postsElements = props.posts.map(
        post => <Post message={post.message} likes={post.likes}/>)

    return (
        <div className={style.postsContainer}>
            <NewPostContainer dispatch={props.dispatch} newPostText={props.newPostText}/>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts