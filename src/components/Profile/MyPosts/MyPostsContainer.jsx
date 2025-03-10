import React from 'react'
import {addPostActionCreator} from './../../../redux/profileReducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPost) => {dispatch(addPostActionCreator(newPost))}
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer