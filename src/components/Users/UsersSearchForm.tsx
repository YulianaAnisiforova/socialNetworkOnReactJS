import React from 'react'
import {FilterType} from '../../redux/usersReducer'
import {useForm} from 'react-hook-form'

type PropsType = {
    onFilterChanged: (filter: FilterType) => void,
}

type form = {
    term: string,
}

export const UsersSearchForm: React.FC<PropsType> = ({onFilterChanged}) => {
    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data: any) => {
        alert(JSON.stringify(data))
        onFilterChanged(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input placeholder={'search'} {...register('search',
                    // {required: 'empty field',}
                )} />
            </div>
            <div>
                <select {...register('select')} >
                    <option value="null">all</option>
                    <option value="true">followed</option>
                    <option value="false">not followed</option>
                </select>
            </div>
            <div>
                <button type={'submit'}>Search</button>
            </div>
        </form>
    )
}