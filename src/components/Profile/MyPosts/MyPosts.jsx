import React from 'react'
import style from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
            <div className={style.postsContainer}>
                my posts
                <div className={style.newPost}>
                    <textarea className={style.newPostArea} cols="50" rows="1" placeholder="How are you?"></textarea>
                    <button className={style.newPostBtn}>Add post</button>
                </div>
                <div className={style.posts}>
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>)
}

export default MyPosts