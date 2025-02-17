import React from 'react'
import {addPostActionCreator, updateNewPostTextActionCreator} from './../../../redux/profileReducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (body) => {dispatch(updateNewPostTextActionCreator(body))},
        addPost: () => {dispatch(addPostActionCreator())}
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer