import React from 'react'
import {connect} from 'react-redux'
import {
    unfollow, getUsers, follow, setCurrentPage, toggleIsFollowingInProgress, getUsers2
} from '../../redux/usersReducer'
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'
import {compose} from 'redux'
import {
    getCurrentPage,
    getIsFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersState
} from '../../redux/usersSelectors'

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers2(pageNumber, this.props.pageSize)
    }

    render = () => {
        return (
            <div>
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
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersState(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFollowingInProgress: getIsFollowingInProgress(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        setCurrentPage, toggleIsFollowingInProgress, getUsers, getUsers2, unfollow, follow
    }),
)(UsersContainer)