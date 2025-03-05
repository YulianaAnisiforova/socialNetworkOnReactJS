import React from 'react'
import style from './ProfileInfo.module.css'
import anonimAvatar from '../../../img/anonim.png'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = ({isOwner, profile, status, updateUserStatus, saveAvatar}) => {
    if (!profile) {
        return <Preloader />
    }

    const onAvatarChanged = (event) => {
        if (event.target.files.length) {
            saveAvatar(event.target.files[0])
        }
    }

    return (
        <div className={style.profileBox}>
            <div className={style.avatarContainer}>
                <img className={style.avatar} src={profile.photos.large || anonimAvatar} alt={'avatar'} />
                {isOwner && <input type='file' onChange={onAvatarChanged} />}
            </div>

            <div className={style.infoBox}>
                <div className={style.name}>{profile.fullName}</div>
                <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo