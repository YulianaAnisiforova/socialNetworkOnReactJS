import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getUserProfile, getUserStatus, saveAvatar, saveProfile, updateUserStatus} from '../../redux/profileReducer'
import {useParams} from 'react-router-dom'
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect'
import {compose} from 'redux'
import {PhotosType, ProfileType} from '../../types/types'
import {AppStateType} from '../../redux/store'

const GetParams = (props: any) => {
    return <ProfileContainer {...props} param={useParams()}/>
}

type MapStateToPropsType = {
    profile: ProfileType | null,
    status: string,
    authorizedUserID: number | null,
    isAuth: boolean,
}
type MapDispatchToPropsType = {
    getUserProfile: (userID: number) => void,
    getUserStatus: (userID: number) => void,
    saveAvatar: (file: PhotosType) => void,
    saveProfile: (profile: ProfileType) => void,
    updateUserStatus: (status: string) => void,
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType
type StateType = {}

class ProfileContainer extends React.Component<PropsType, StateType> {

    refreshProfile() {
        //@ts-ignore
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

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        //@ts-ignore
        if (this.props.param.userId !== prevProps.param.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            //@ts-ignore
            <Profile isOwner={!this.props.param.userId}
                     {...this.props} profile={this.props.profile}
                     status={this.props.status}
                     saveAvatar={this.props.saveAvatar}
                     saveProfile={this.props.saveProfile}
                     updateUserStatus={this.props.updateUserStatus}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserID: state.auth.userID,
        isAuth: state.auth.isAuth,
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
        {getUserProfile, getUserStatus, updateUserStatus, saveAvatar, saveProfile}),
    WithAuthRedirect
)(GetParams)