import React from 'react'
import style from './Post.module.css'
import userAvatar from '../../../../img/avatar.jpg'

const Post = (props) => {
    return (
        <div className={style.item}>
            <div>
                <img src={userAvatar} alt="avatar"/>
            </div>

            <div className={style.textContainer}>
                <div className={style.text}>
                    <span>
                        {props.message}
                    </span>
                </div>
            </div>

            <div>
                <span className={style.likes}> {props.likes} likes</span>
            </div>
        </div>)
}

export default Post