import React from 'react'
import style from './Login.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {AppStateType} from '../../redux/store'
import {loginThunk} from '../../redux/authReducer'
import LoginForm from './LoginForm'

const Login = () => {
    const isAuth = useSelector((state: AppStateType) =>state.auth.isAuth)
    const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL)
    const dispatch = useDispatch<any>()

    const onSubmit = (data: any) => {
        dispatch(loginThunk(data.email, data.password, data.rememberMe, data.captcha))
    }

    if (isAuth) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={style.loginBox}>
            <div className={style.header}>
                <span>Login</span>
            </div>
            <LoginForm captchaURL={captchaURL} onSubmit={onSubmit}/>
        </div>
    )
}

export default Login
