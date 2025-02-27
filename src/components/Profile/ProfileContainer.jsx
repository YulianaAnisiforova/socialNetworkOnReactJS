import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getUserProfile, getUserStatus, updateUserStatus} from '../../redux/profileReducer'
import {useParams} from 'react-router-dom'
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect'
import {compose} from 'redux'

const GetParams = (props) => {
    return <ProfileContainer {...props} param={useParams()} />
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        debugger
        let userID = this.props.param.userId
        if (!userID) {
            userID = this.props.authorizedUserID
            // userID = 32162
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
    WithAuthRedirect
)(GetParams)