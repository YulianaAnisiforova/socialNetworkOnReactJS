import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getUserProfile, getUserStatus, updateUserStatus} from '../../redux/profileReducer'
import {useParams} from 'react-router-dom'
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect'
import {compose} from 'redux'

export function withRouter(Children) {
    return (props) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userID = this.props.match.params.userID
        if (!userID && this.props.isAuth) {
            userID = this.props.authorizedUserID
        }

        this.props.getUserProfile(userID)
        this.props.getUserStatus(userID)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserID: state.auth.userID,
        isAuth: state.auth.isAuth,
    }
}

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    // WithAuthRedirect
)(ProfileContainer)