import React from 'react'
import style from './Users.module.css'
import Paginator from '../Common/Paginator/Paginator'
import UserItem from './UserItem'

const Users = (props) => {

    return (
        <div className={style.wrapper}>
            {
                props.users.map((user) => <UserItem key={user.id} user={user}
                                                    isFollowingInProgress={props.isFollowingInProgress}
                                                    unfollow={props.unfollow} follow={props.follow} />
                )
            }
            <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
                       onPageChanged={props.onPageChanged} currentPage={props.currentPage}/>
        </div>
    )
}

export default Users
