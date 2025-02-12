import React from 'react'
import style from './ProfileInfo.module.css'
import userAvatar from '../../../img/avatar.jpg'
import userBanner from '../../../img/banner.png'
import Preloader from '../../Common/Preloader/Preloader'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                <img className={style.banner} src={userBanner} alt="welcome"/>
            </div>
            <div className={style.avatarContainer}>
                {/*<img className={style.avatar} src={userAvatar} alt="avatar"/>*/}
                <img className={style.avatar} src={props.profile.photos.large} alt="avatar"/>
            </div>
        </div>
    )
}

export default ProfileInfo