import React from 'react'
import Profile from './Profile'
import {connect} from "react-redux";
import {getUserProfile} from '../../redux/profileReducer'
import {useParams} from 'react-router-dom'

export function withRouter(Children) {
    return (props) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userID = this.props.match.params.userID
        if (!userID) {
            userID = 32162
        }

        this.props.getUserProfile(userID)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}

let WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile})(WithURLDataContainerComponent)