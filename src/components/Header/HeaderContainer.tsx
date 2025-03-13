import React from 'react'
import Header from './Header'
import {authMe, logout} from '../../redux/authReducer'
import {connect} from 'react-redux'

type MapStateToPropsType = {
    userID: number,
    email: string,
    login: string,
    isAuth: boolean,
}

type MapDispatchToPropsType = {
    authMe: () => void,
    logout: () => void,
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

type StateType = {}

class HeaderComponent extends React.Component<PropsType, StateType> {
    componentDidMount() {
        this.props.authMe()
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        userID: state.auth.userID,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {authMe, logout})(HeaderComponent)
