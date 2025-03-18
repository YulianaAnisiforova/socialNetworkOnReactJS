import React, {useEffect} from 'react'
import style from './Users.module.css'
import Paginator from '../Common/Paginator/Paginator'
import UserItem from './UserItem'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/store'
import {follow, getUsers, getUsers2, unfollow} from '../../redux/usersReducer'

const Users = () => {
    const users = useSelector((state: AppStateType) => state.usersPage.users)
    const currentPage = useSelector((state: AppStateType) => state.usersPage.currentPage)
    const isFollowingInProgress = useSelector((state: AppStateType) => state.usersPage.isFollowingInProgress)
    const totalUsersCount = useSelector((state: AppStateType) => state.usersPage.totalUsersCount)
    const pageSize = useSelector((state: AppStateType) => state.usersPage.pageSize)
    const dispatch = useDispatch<any>()

    const onFollow = (userID: number) => {
        dispatch(follow(userID))
    }

    const onUnfollow = (userID: number) => {
        dispatch(unfollow(userID))
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers2(pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    }, [])

    return (
        <div className={style.wrapper}>
            {
                users.map((user) => <UserItem key={user.id} user={user}
                                                    isFollowingInProgress={isFollowingInProgress}
                                                    unfollow={onUnfollow} follow={onFollow} />
                )
            }
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                       onPageChanged={onPageChanged} currentPage={currentPage}/>
        </div>
    )
}

export default Users
