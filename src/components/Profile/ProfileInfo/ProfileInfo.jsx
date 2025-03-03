import React from 'react'
import style from './ProfileInfo.module.css'
import anonim from '../../../img/anonim.png'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatusHooks from "./ProfileStatusHooks";

const ProfileInfo = ({profile, status, updateUserStatus}) => {
    if (!profile) {
        return <Preloader />
    }

    return (
        <div className={style.profileBox}>
            <div className={style.avatarContainer}>
                {profile.photos.large
                ? <img className={style.avatar} src={profile.photos.large} alt="avatar"/>
                    : <img className={style.avatar} src={anonim} alt="avatar"/>
            }
            </div>

            <div className={style.infoBox}>
                <div className={style.name}>{profile.fullName}</div>
                <ProfileStatusHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo