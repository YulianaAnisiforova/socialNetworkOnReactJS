import React from 'react'
import style from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import userAvatar from './avatar.jpg'
import userBanner from './banner.png'

const Profile = () => {
    return (
        <div>
            <div>
                <img className={style.banner} src={userBanner} alt="welcome"/>
            </div>
            <div className={style.avatarContainer}>
                <img className={style.avatar} src={userAvatar} alt="avatar"/>
            </div>
            <MyPosts />
        </div>)
}

export default Profile