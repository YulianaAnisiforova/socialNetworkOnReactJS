import React from 'react'
import style from './Users.module.css'
import Paginator from '../Common/Paginator/Paginator'
import UserItem from './UserItem'
import {UserType} from '../../types/types'

type PropsType = {
    users: Array<UserType>,
    isFollowingInProgress: Array<number>,
    unfollow: (userID: number) => void,
    follow: (userID: number) => void,
    totalUsersCount: number,
    pageSize: number,
    onPageChanged: (page: number) => void,
    currentPage: number,
}

const Users: React.FC<PropsType> = (props) => {
    return (
        <div className={style.wrapper}>
            {
                props.users.map((user) => <UserItem key={user.id} user={user}
                                                    isFollowingInProgress={props.isFollowingInProgress}
                                                    unfollow={props.unfollow} follow={props.follow} />
                )
            }
            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                       onPageChanged={props.onPageChanged} currentPage={props.currentPage}/>
        </div>
    )
}

export default Users
