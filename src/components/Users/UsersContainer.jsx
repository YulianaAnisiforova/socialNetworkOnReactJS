import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {followActionCreator, setUsersActionCreator, unFollowActionCreator} from "../../redux/usersReducer";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        followUser: (userID) => {dispatch(followActionCreator(userID)) },
        unfollowUser: (userID) => {dispatch(unFollowActionCreator(userID)) },
        setUsers: (users) => {dispatch(setUsersActionCreator(users)) },
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer
