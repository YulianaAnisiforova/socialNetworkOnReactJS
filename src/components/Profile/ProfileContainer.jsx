import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getUserProfile, getUserStatus, saveAvatar, updateUserStatus} from '../../redux/profileReducer'
import {useParams} from 'react-router-dom'
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect'
import {compose} from 'redux'

const GetParams = (props) => {
    return <ProfileContainer {...props} param={useParams()}/>
}

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userID = this.props.param.userId
        if (!userID) {
            userID = this.props.authorizedUserID
            // userID = 32162
        }

        this.props.getUserProfile(userID)
        this.props.getUserStatus(userID)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.param.userId !== prevProps.param.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile isOwner={!this.props.param.userId}
                     {...this.props} profile={this.props.profile}
                     status={this.props.status}
                     saveAvatar={this.props.saveAvatar}
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
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, saveAvatar}),
    WithAuthRedirect
)(GetParams)