import React from 'react'
import style from './Users.module.css'
import anonymousAvatar from './../../img/anonim.png'
import {NavLink} from 'react-router-dom'
import {UserType} from '../../types/types'

type PropsType = {
    user: UserType,
    isFollowingInProgress: Array<number>,
    unfollow: (userID: number) => void,
    follow: (userID: number) => void,
}

const UserItem: React.FC<PropsType> = ({user, isFollowingInProgress, unfollow, follow}) => {
    return (
        <div key={user.id} className={style.item}>
            <div className={style.avatarFollow}>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img className={style.userAvatar} src={user.photos.small != null
                            ? user.photos.small : anonymousAvatar} alt="avatar"/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={isFollowingInProgress.some(id => id === user.id)}
                                className={style.followBtn} onClick={() => {unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={isFollowingInProgress.some(id => id === user.id)}
                                  className={style.followBtn} onClick={() => {follow(user.id)
                        }}>Follow</button>}
                </div>
            </div>

            <div className={style.userInfo}>
                <div>{user.name}</div>
                <div className={style.status}>{user.status}</div>
            </div>
        </div>

    )
}

export default UserItem
