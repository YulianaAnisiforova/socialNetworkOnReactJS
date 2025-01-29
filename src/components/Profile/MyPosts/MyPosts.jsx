import React from 'react'
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import Likes from './Likes/Likes'

const MyPosts = () => {
    return (
            <div className={style.postsContainer}>
                <div className={style.newPost}>
                    <textarea className={style.newPostArea} cols="50" rows="1" placeholder="How are you?"  contenteditable="true"></textarea>
                    <button className={style.newPostBtn}>Add post</button>
                </div>
                <div className={style.posts}>
                    <Post message='I`m going to visit my gruncle Stan again this summer OMG soooo excited!! Looking forward to meet him again!!!!!' likes='1488'/>
                    <Post message='My brother Dipper is sooooo annoying' likes='2'/>
                    <Post message='Hello everyone it`s my first post here haha' likes='7'/>
                </div>
            </div>)
}

export default MyPosts