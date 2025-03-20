import React from 'react'
import style from './NavBar.module.css'
import {NavLink} from 'react-router-dom'
import {
    CustomerServiceOutlined,
    GlobalOutlined,
    MessageOutlined, NotificationOutlined,
    SlidersOutlined, TeamOutlined, UserOutlined
} from '@ant-design/icons'

const NavBar = () => {
    return (
        <nav className={style.nav}>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/profile'><UserOutlined /> Profile </NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/users'><TeamOutlined /> Friends </NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/dialogs'><MessageOutlined /> Messages </NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/news'><NotificationOutlined /> News </NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/music'><CustomerServiceOutlined /> Music </NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/settings'><SlidersOutlined /> Settings </NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={navData => navData.isActive ? style.active : style.link}
                         to='/chat'><GlobalOutlined /> Global chat</NavLink>
            </div>
        </nav>
    )
}

export default NavBar