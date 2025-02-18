import React from 'react'
import style from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import {Navigate} from 'react-router-dom'

const Profile = (props) => {
    if (!props.isAuth) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>)
}

export default Profile