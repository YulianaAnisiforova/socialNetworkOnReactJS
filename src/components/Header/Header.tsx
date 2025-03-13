import React from 'react'
import style from './Header.module.css'
import logo from './../../img/logo.png'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/store'
import {logout} from '../../redux/authReducer'

type PropsType = {}

const Header: React.FC<PropsType> = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)
    const dispatch = useDispatch()

    const logout = ():void => {
        dispatch(logout())
    }

    return (
        <div className={style.header}>
            <div className={style.loginBlock}>
                {isAuth ?
                    <div className={style.authInfo}>
                        <div>{login}</div>
                        <div>
                            <button className={style.link} onClick={logout}>Log out</button>
                        </div>
                    </div>
                    : <NavLink className={style.link} to={'/login'}>Log in</NavLink>}
            </div>

            <div className={style.logoContainer}>
                <img src={logo} alt="logo"/>
            </div>
        </div>)
}

export default Header