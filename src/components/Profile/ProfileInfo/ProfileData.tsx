import React from 'react'
import style from './ProfileInfo.module.css'
import {ContactsType, ProfileType} from '../../../types/types'
import {IdcardOutlined} from '@ant-design/icons'

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

            {isOwner && <button className={style.editBtn} onClick={goToEditMode}>
                <IdcardOutlined /> Edit profile info</button>}
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

export default ProfileData