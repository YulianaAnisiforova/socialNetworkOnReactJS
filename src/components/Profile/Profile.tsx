import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {PhotosType, ProfileType} from '../../types/types'
import MyPosts from './MyPosts/MyPosts'

type PropsType = {
    isOwner: boolean,
    profile: ProfileType | null,
    status: string,
    saveAvatar: (file: PhotosType) => void,
    saveProfile: (profile: ProfileType) => void,
    updateUserStatus: (status: string) => void,
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
                         saveAvatar={props.saveAvatar}
                         saveProfile={props.saveProfile}
                         updateUserStatus={props.updateUserStatus} />
            <MyPosts />
        </div>)
}

export default Profile