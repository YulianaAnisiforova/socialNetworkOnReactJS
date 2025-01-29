import React from 'react'
import style from './Post.module.css'
import userAvatar from './../../avatar.jpg'
import Likes from './Likes/Likes'

const Post = (props) => {
    return (
        <div className={style.item}>
            <div>
                <img src={userAvatar} alt="avatar"/>
            </div>
            <div className={style.textContainer}>
                <div className={style.text}>
                    {props.message}
                </div>
            </div>
            <div>
                <Likes likes={props.likes}/>
            </div>
        </div>)
}

export default Post