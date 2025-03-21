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
import {LinkOutlined} from '@ant-design/icons'

type ProfileInfoPropsType = {
    isOwner: boolean,
    profile: ProfileType | null,
    status: string,
    saveAvatarThunk: (file: PhotosType) => void,
    saveProfileInfoThunk: (profile: ProfileType) => void,
    updateStatusThunk: (status: string) => void,
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({isOwner, profile,
                                                         status, updateStatusThunk,
                                                         saveAvatarThunk, saveProfileInfoThunk}) => {

    const contactsError = useSelector((state: AppStateType) => state.profilePage.contactsError)

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onAvatarChanged = (event: any) => {
        if (event.target.files.length) {
            saveAvatarThunk(event.target.files[0])
        }
    }

    let onSubmitContainer = async (data: ProfileType) => {
        await saveProfileInfoThunk(data)
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
                            <LinkOutlined /> Change avatar
                        </label>
                    }
                </div>
            </div>

            <div className={style.infoBox}>
                <div className={style.name}>{profile.fullName}</div>
                <ProfileStatus isOwner={isOwner} status={status} updateStatusThunk={updateStatusThunk}/>

                {editMode
                    ? <ProfileDataForm profile={profile} contactsError={contactsError} onSubmitContainer={onSubmitContainer} />
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}
            </div>
        </div>
    )
}

export default ProfileInfo