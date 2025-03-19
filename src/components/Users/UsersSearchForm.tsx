import React from 'react'
import {FilterType} from '../../redux/usersReducer'
import {useForm} from 'react-hook-form'
import style from './Users.module.css'

type PropsType = {
    onFilterChanged: (filter: FilterType) => void,
}

export const UsersSearchForm: React.FC<PropsType> = ({onFilterChanged}) => {
    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data: any) => {
        // alert(JSON.stringify(data))
        onFilterChanged(data)
    }

    return (
        <form className={style.searchForm} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input className={style.termFilter} placeholder={'search'} {...register('term')} />
            </div>
            <div>
                <select className={style.selectFilter} {...register('selectFilter')} >
                    <option value="null">all</option>
                    <option value="true">followed</option>
                    <option value="false">not followed</option>
                </select>
            </div>
            <div>
                <button className={style.btn} type={'submit'}>Search</button>
            </div>
        </form>
    )
}