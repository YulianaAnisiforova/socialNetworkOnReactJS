import React from 'react'
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from '../../redux/profileReducer'
import { useParams } from 'react-router-dom'

export function withRouter(Children){
    return(props)=>{
        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userID = this.props.match.params.userID
        if (!userID) {
            userID = 32162
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+userID)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}

let WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithURLDataContainerComponent)