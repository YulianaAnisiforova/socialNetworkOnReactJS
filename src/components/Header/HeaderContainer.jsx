import React from 'react'
import Header from './Header'
import axios from 'axios'
import {setAuthUserData, toggleIsFetching} from '../../redux/authReducer'
import {connect} from 'react-redux'

class HeaderComponent extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
            .then(response => {
                this.props.toggleIsFetching(false)
                if (response.data.resultCode === 0) {
                    this.props.setAuthUserData(response.data.data.id,
                        response.data.data.email, response.data.data.login)
                }
            })
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
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {setAuthUserData, toggleIsFetching})(HeaderComponent)
