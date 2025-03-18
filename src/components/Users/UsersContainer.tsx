import React from 'react'
import {useSelector} from 'react-redux'
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'
import {AppStateType} from '../../redux/store'

const UsersContainer = () => {
    const isFetching = useSelector((state: AppStateType) => state.usersPage.isFetching)

    return (
        <div>
            {isFetching ? <Preloader/> : null}
            <Users />
        </div>
    )
}

export default UsersContainer
