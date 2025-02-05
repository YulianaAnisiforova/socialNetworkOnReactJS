import React from 'react'
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../redux/profileReducer";
import NewPost from "./NewPost/NewPost";

const NewPostContainer = (props) => {
    let addPostBtn = () => {
        props.dispatch(addPostActionCreator())
    }

    let onPostChange = (text) => {
        props.dispatch(updateNewPostTextActionCreator(text))
    }

    return (
        <NewPost updateNewPostText={onPostChange} addPost={addPostBtn} newPostText={props.newPostText}/>
    )
}

export default NewPostContainer