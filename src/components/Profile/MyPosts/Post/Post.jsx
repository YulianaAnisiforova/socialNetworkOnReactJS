import React from 'react'
import style from './Post.module.css'
import userAvatar from './../../avatar.jpg'
import Likes from '../Likes/Likes'

const Post = (props) => {
    return (
        <div className={style.item}>
            <img src={userAvatar} alt="avatar"/>
            {props.message}
            <div>
                <Likes likes={props.likes}/>
            </div>
        </div>)
}

export default Post