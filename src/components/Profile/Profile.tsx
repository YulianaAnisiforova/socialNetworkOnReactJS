import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {PhotosType, ProfileType} from '../../types/types'
import MyPosts from './MyPosts/MyPosts'

type PropsType = {
    isOwner: boolean,
    profile: ProfileType | null,
    status: string,
    saveAvatarThunk: (file: PhotosType) => void,
    saveProfileInfoThunk: (profile: ProfileType) => void,
    updateStatusThunk: (status: string) => void,
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
                         saveAvatarThunk={props.saveAvatarThunk}
                         saveProfileInfoThunk={props.saveProfileInfoThunk}
                         updateStatusThunk={props.updateStatusThunk} />
            <MyPosts />
        </div>)
}

export default Profile