import React from 'react'
import {connect} from 'react-redux'
import {
    follow, getUsersThunkCreator, setCurrentPage, setTotalUsersCount,
    setUsers, toggleIsFetching, toggleIsFollowingInProgress, unfollow
} from '../../redux/usersReducer'
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'
import {usersAPI} from '../../api/api'

class UsersAPIContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator()
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers2(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })
    }

    render = () => {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       users={this.props.users}
                       onPageChanged={this.onPageChanged}
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
                       currentPage={this.props.currentPage}
                       toggleIsFollowingInProgress={this.props.toggleIsFollowingInProgress}
                       isFollowingInProgress={this.props.isFollowingInProgress}
                />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFollowingInProgress: state.usersPage.isFollowingInProgress,
    }
}

const UsersContainer = connect(mapStateToProps, {
    follow, unfollow, setUsers,
    setCurrentPage, setTotalUsersCount, toggleIsFetching,
    toggleIsFollowingInProgress, getUsersThunkCreator})(UsersAPIContainer)

export default UsersContainer
