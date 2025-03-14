import React, {useState} from 'react'
import style from './ProfileInfo.module.css'
import anonimAvatar from '../../../img/anonim.png'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import ProfileDataForm from './ProfileDataForm'
import {useSelector} from 'react-redux'

const ProfileInfo = ({isOwner, profile, status, updateUserStatus, saveAvatar, saveProfile}) => {

    const contactsError = useSelector((state) => state.profilePage.contactsError)

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onAvatarChanged = (event) => {
        if (event.target.files.length) {
            saveAvatar(event.target.files[0])
        }
    }

    let onSubmitContainer = async (data) => {
        await saveProfile(data)
            if (!contactsError) {
                setEditMode(false)
            }
                else {
                setEditMode(true)
            }
    }

    return (
        <div className={style.profileBox}>
            <div className={style.avatarContainer}>
                <div>
                    <img className={style.avatar} src={profile.photos.large || anonimAvatar} alt={'avatar'}/>
                </div>
                <div>
                    {isOwner &&
                        <label htmlFor='chooseFile' className={style.editBtn}>
                            {isOwner && <input type='file' onChange={onAvatarChanged} id='chooseFile'/>}
                            Change avatar
                        </label>
                    }
                </div>
            </div>

            <div className={style.infoBox}>
                <div className={style.name}>{profile.fullName}</div>
                <ProfileStatus isOwner={isOwner} status={status} updateUserStatus={updateUserStatus}/>

                {editMode
                    ? <ProfileDataForm profile={profile} contactsError={contactsError} onSubmitContainer={onSubmitContainer}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {

    return (
        <div>
            <br/>

            <div>
                Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJobDescription &&
                <div>
                    My professional skills: {profile.lookingForAJobDescription}
                </div>
            }
            {profile.aboutMe &&
                <div>
                    About me: {profile.aboutMe}
                </div>
            }

            <br/>

            <div>
                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>

            {isOwner && <button className={style.editBtn} onClick={goToEditMode}>Edit profile info</button>}
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div>
            {contactValue &&
                <div>
                    {contactTitle}: {contactValue}
                </div>
            }
        </div>
    )
}

export default ProfileInfo