import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import {ProfileType} from "../../types/types";

type PropsType = {
    isOwner: boolean,
    profile: ProfileType,
    status: string,
    saveAvatar: () => void,
    saveProfile: () => void,
    updateUserStatus: () => void,
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
                         saveAvatar={props.saveAvatar}
                         saveProfile={props.saveProfile}
                         updateUserStatus={props.updateUserStatus} />
            <MyPostsContainer/>
        </div>)
}

export default Profile