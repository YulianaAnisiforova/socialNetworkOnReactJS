import React from 'react'
import {FilterType} from '../../redux/usersReducer'
import {useForm} from 'react-hook-form'
import style from './Users.module.css'
import {SearchOutlined} from '@ant-design/icons'

type PropsType = {
    onFilterChanged: (filter: FilterType) => void,
}

export const UsersSearchForm: React.FC<PropsType> = ({onFilterChanged}) => {
    const {
        register,
        handleSubmit,
    } = useForm<any>()

    const onSubmit = (data: any) => {
        onFilterChanged(data)
    }

    return (
        <form className={style.searchForm} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input className={style.termFilter} placeholder={'search'} {...register('term')} />
            </div>
            <div>
                <select className={style.selectFilter} {...register('selectFilter')} >
                    <option value='null'>all</option>
                    <option value='true'>following</option>
                    <option value='false'>not following</option>
                </select>
            </div>
            <div>
                <button className={style.btn} type={'submit'}><SearchOutlined /></button>
            </div>
        </form>
    )
}