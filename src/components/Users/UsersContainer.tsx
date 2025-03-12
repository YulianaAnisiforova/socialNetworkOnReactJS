import React from 'react'
import {connect} from 'react-redux'
import {unfollow, getUsers, follow, getUsers2} from '../../redux/usersReducer'
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
import {UserType} from '../../types/types'
import {AppStateType} from '../../redux/reduxStore'

type MapStateToPropsType = {
    currentPage: number,
    pageSize: number,
    isFetching?: boolean,
    totalUsersCount: number,
    isFollowingInProgress: Array<number>,
    users: Array<UserType>,
}
type MapDispatchToPropsType = {
    getUsers2: (pageNumber: number, pageSize: number) => void,
    getUsers: (currentPage: number, pageSize: number) => void,
    unfollow: (userID: number) => void,
    follow: (userID: number) => void,
}
type OwnPropsType = {
    pageTitle: string,
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

type StateType = {}

class UsersContainer extends React.Component<PropsType, StateType> {
    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize} = this.props
        this.props.getUsers2(pageNumber, pageSize)
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

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsersState(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFollowingInProgress: getIsFollowingInProgress(state),
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        getUsers, getUsers2, unfollow, follow
    }),
)(UsersContainer)