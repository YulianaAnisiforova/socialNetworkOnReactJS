import React, {useEffect} from 'react'
import style from './Users.module.css'
import Paginator from '../Common/Paginator/Paginator'
import UserItem from './UserItem'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/store'
import {FilterType, follow, getUsers, unfollow} from '../../redux/usersReducer'
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import {UsersSearchForm} from './UsersSearchForm'

const Users = () => {
    const users = useSelector((state: AppStateType) => state.usersPage.users)
    const currentPage = useSelector((state: AppStateType) => state.usersPage.currentPage)
    const isFollowingInProgress = useSelector((state: AppStateType) => state.usersPage.isFollowingInProgress)
    const totalUsersCount = useSelector((state: AppStateType) => state.usersPage.totalUsersCount)
    const pageSize = useSelector((state: AppStateType) => state.usersPage.pageSize)
    const dispatch = useDispatch<any>()

    const term = useSelector((state: AppStateType) => state.usersPage.filter)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const stringTerm = searchParams.get('term') || ''
        const stringFriend = searchParams.get('user') || ''
        const stringPage = searchParams.get('page') || 1

        let actualPage = currentPage
        let actualFilter = term
        actualFilter = {...actualFilter, term: stringTerm,
            selectFilter: stringFriend
        }

        if(stringPage) actualPage = Number(stringPage)

        switch (stringFriend) {
            case 'null':
                actualFilter = {...actualFilter, selectFilter: null}
                break
            case 'true':
                actualFilter = {...actualFilter, selectFilter: true}
                break
            case 'false':
                actualFilter = {...actualFilter, selectFilter: false}
                break
        }

        dispatch(getUsers(actualPage, pageSize, actualFilter))
    },[location.search])

    useEffect(() => {
        navigate({
            pathname: '/users',
            search: `?term=${term.term}&user=${term.selectFilter}&page=${currentPage}`
        })
    },[term, currentPage])

    const onFollow = (userID: number) => {
        dispatch(follow(userID))
    }

    const onUnfollow = (userID: number) => {
        dispatch(unfollow(userID))
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, term))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }

    // useEffect(() => {
    //     dispatch(getUsers(currentPage, pageSize, term))
    // }, [])

    return (
        <div className={style.wrapper}>
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
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
