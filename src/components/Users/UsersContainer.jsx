import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {
    followActionCreator,
    setCurrentPageCreator, setTotalUsersCountActionCreator,
    setUsersActionCreator,
    unFollowActionCreator
} from "../../redux/usersReducer";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        followUser: (userID) => {dispatch(followActionCreator(userID)) },
        unfollowUser: (userID) => {dispatch(unFollowActionCreator(userID)) },
        setUsers: (users) => {dispatch(setUsersActionCreator(users)) },
        setCurrentPage: (currentPage) => {dispatch(setCurrentPageCreator(currentPage))},
        setTotalUsersCount: (totalCount) => {dispatch(setTotalUsersCountActionCreator(totalCount))}
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer
