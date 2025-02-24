import React from 'react'
import Header from './Header'
import {authMe, logout} from '../../redux/authReducer'
import {connect} from 'react-redux'

class HeaderComponent extends React.Component {
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
