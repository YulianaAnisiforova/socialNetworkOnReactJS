import React from 'react'
import style from './ProfileInfo.module.css'
import userAvatar from '../../../img/avatar.jpg'
import anonim from '../../../img/anonim.png'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import ProfileStatusHooks from "./ProfileStatusHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div className={style.profileBox}>
            <div className={style.avatarContainer}>
                {props.profile.photos.large
                ? <img className={style.avatar} src={props.profile.photos.large} alt="avatar"/>
                    : <img className={style.avatar} src={anonim} alt="avatar"/>
            }
            </div>

            <div className={style.infoBox}>
                <div className={style.name}>{props.profile.fullName}</div>
                <ProfileStatusHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo