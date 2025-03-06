import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

const Profile = (props) => {
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