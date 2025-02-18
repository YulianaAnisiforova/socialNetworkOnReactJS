import React from 'react'
import {connect} from 'react-redux'
import {
    unfollow,
    followSuccess, getUsers, follow, setCurrentPage, toggleIsFollowingInProgress, unfollowSuccess, getUsers2
} from '../../redux/usersReducer'
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect'
import {compose} from 'redux'

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers2(pageNumber, this.props.pageSize)
    }

    render = () => {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       users={this.props.users}
                       onPageChanged={this.onPageChanged}
                       currentPage={this.props.currentPage}
                       isFollowingInProgress={this.props.isFollowingInProgress}
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
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

export default compose(
    connect(mapStateToProps, {
        setCurrentPage, toggleIsFollowingInProgress, getUsers, getUsers2, unfollow, follow
    }),
    WithAuthRedirect
)(UsersContainer)