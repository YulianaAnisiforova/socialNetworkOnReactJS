import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getProfileThunk, getStatusThunk, saveAvatarThunk, saveProfileInfoThunk, updateStatusThunk} from '../../redux/profileReducer'
import {useParams} from 'react-router-dom'
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect'
import {compose} from 'redux'
import {PhotosType, ProfileType} from '../../types/types'
import {AppStateType} from '../../redux/store'

const GetParams = (props: any) => {
    const param = useParams()
    return <ProfileContainer {...props} param={param}/>
}

type MapStateToPropsType = {
    profile: ProfileType | null,
    status: string,
    authorizedUserID: number | null,
    isAuth: boolean,
}
type MapDispatchToPropsType = {
    getProfileThunk: (userID: number) => void,
    getStatusThunk: (userID: number) => void,
    saveAvatarThunk: (file: PhotosType) => void,
    saveProfileInfoThunk: (profile: ProfileType) => void,
    updateStatusThunk: (status: string) => void,
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

        this.props.getProfileThunk(userID)
        this.props.getStatusThunk(userID)
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
                     saveAvatarThunk={this.props.saveAvatarThunk}
                     saveProfileInfoThunk={this.props.saveProfileInfoThunk}
                     updateStatusThunk={this.props.updateStatusThunk}/>
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
        {getProfileThunk, getStatusThunk, updateStatusThunk, saveAvatarThunk, saveProfileInfoThunk}),
    WithAuthRedirect
)(GetParams)