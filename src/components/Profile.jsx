import React from 'react'
import style from './Profile.module.css'

const Profile = () => {
    return (
        <div className={style.content}>
            <div>
                <img className={style.banner} src="https://png.pngtree.com/png-vector/20220924/ourmid/pngtree-welcome-transparent-text-png-image_238532.png" alt="welcome"/>
            </div>
            <div className={style.avatarContainer}>
                <img className={style.avatar} src="https://wallpapers.com/images/hd/mabel-pines-phone-chat-gravity-falls-9szwl6nu2g195bxn.jpg" alt="avatar"/>
            </div>
            <div className={style.postsContainer}>
                my posts
                <div>
                    new post
                </div>
                <div className={style.posts}>
                    <div className={style.item}>post1</div>
                    <div className={style.item}>post2</div>
                </div>
            </div>
        </div>)
}

export default Profile