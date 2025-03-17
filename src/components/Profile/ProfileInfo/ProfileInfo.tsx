import React, {useState} from 'react'
import style from './ProfileInfo.module.css'
import anonimAvatar from '../../../img/anonim.png'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import ProfileDataForm from './ProfileDataForm'
import {useSelector} from 'react-redux'
import {PhotosType, ProfileType} from '../../../types/types'
import {AppStateType} from '../../../redux/store'
import ProfileData from './ProfileData'

type ProfileInfoPropsType = {
    isOwner: boolean,
    profile: ProfileType | null,
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

export default ProfileInfo