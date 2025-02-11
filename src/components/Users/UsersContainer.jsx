import React from "react";
import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageCreator, setTotalUsersCountActionCreator,
    setUsersActionCreator,
    unFollowActionCreator
} from "../../redux/usersReducer";
import axios from "axios";
import Users from "./Users";

class UsersContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render = () => {
        return (
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   users={this.props.users}
                   onPageChanged={this.onPageChanged}
                   unfollowUser={this.props.unfollowUser}
                   followUser={this.props.followUser}
                   currentPage={this.props.currentPage}
            />
        )
    }
}

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

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

export default UsersContainer
