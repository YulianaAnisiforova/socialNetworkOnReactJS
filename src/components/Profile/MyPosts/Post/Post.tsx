import React from 'react'
import style from './Post.module.css'
import userAvatar from '../../../../img/avatar.jpg'
import {LikeOutlined} from '@ant-design/icons'

type PropsType = {
    message: string,
    likes: number,
}

const Post: React.FC<PropsType> = (props) => {
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

            <div className={style.likesBox}>
                <span className={style.likes}> {props.likes || 0} <LikeOutlined /></span>
            </div>
        </div>)
}

export default Post