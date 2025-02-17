import React from 'react'
import Header from './Header'
import {setAuthUserData, toggleIsFetching} from '../../redux/authReducer'
import {connect} from 'react-redux'
import {usersAPI} from '../../api/api'

class HeaderComponent extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getAuthMe().then(data => {
                this.props.toggleIsFetching(false)
                if (data.resultCode === 0) {
                    this.props.setAuthUserData(data.data.id,
                        data.data.email, data.data.login)
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
