import React from 'react'
import style from './ProfileInfo.module.css'
import userAvatar from '../../../img/avatar.jpg'
import userBanner from '../../../img/banner.png'

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img className={style.banner} src={userBanner} alt="welcome"/>
            </div>
            <div className={style.avatarContainer}>
                <img className={style.avatar} src={userAvatar} alt="avatar"/>
            </div>
        </div>
    )
}

export default ProfileInfo