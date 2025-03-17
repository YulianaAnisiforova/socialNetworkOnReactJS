import React, {useState} from 'react'
import style from './ProfileInfo.module.css'
import anonimAvatar from '../../../img/anonim.png'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import ProfileDataForm from './ProfileDataForm'
import {useSelector} from 'react-redux'
import {ContactsType, PhotosType, ProfileType} from '../../../types/types'
import {AppStateType} from '../../../redux/store'

type ProfileInfoPropsType = {
    isOwner: boolean,
    profile: ProfileType,
    status: string,
    saveAvatar: (file: PhotosType) => void,
    saveProfile: (profile: ProfileType) => void,
    updateUserStatus: (status: string) => void,
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({isOwner, profile, status, updateUserStatus, saveAvatar, saveProfile}) => {

    const contactsError = useSelector((state: AppStateType) => state.profilePage.contactsError)

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onAvatarChanged = (event: any) => {
        if (event.target.files.length) {
            saveAvatar(event.target.files[0])
        }
    }

    let onSubmitContainer = async (data: ProfileType) => {
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
                    ? <ProfileDataForm profile={profile} contactsError={contactsError} onSubmitContainer={onSubmitContainer} />
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    isOwner: boolean,
    profile: ProfileType,
    goToEditMode: () => void,
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
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
                {(Object.keys(profile.contacts) as Array<keyof ContactsType>).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>

            {isOwner && <button className={style.editBtn} onClick={goToEditMode}>Edit profile info</button>}
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string,
    contactValue: string,
}

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
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