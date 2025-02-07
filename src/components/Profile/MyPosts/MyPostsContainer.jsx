import React from 'react'
import {addPostActionCreator, updateNewPostTextActionCreator} from "./../../../redux/profileReducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
    let addPostBtn = () => {
        props.dispatch(addPostActionCreator())
    }

    let onPostChange = (text) => {
        props.dispatch(updateNewPostTextActionCreator(text))
    }

    return (
        <MyPosts updateNewPostText={onPostChange} addPost={addPostBtn}
                 posts={props.posts} newPostText={props.newPostText}/>
    )
}

export default MyPostsContainer