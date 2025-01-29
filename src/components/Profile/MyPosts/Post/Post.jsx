import React from 'react'
import style from './Post.module.css'
import userAvatar from './../../avatar.jpg'

const Post = () => {
    return (
        <div className={style.item}>
            <img src={userAvatar} alt="avatar"/>
            post
            <div>
                <span>like</span>
            </div>
        </div>)
}

export default Post