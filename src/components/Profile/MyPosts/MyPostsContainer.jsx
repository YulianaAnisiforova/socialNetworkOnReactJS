import React from 'react'
import {actions} from '../../../redux/profileReducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPost) => {dispatch(actions.addPostActionCreator(newPost))}
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer