import React from 'react'
import style from './ProfileInfo.module.css'
import {useForm} from 'react-hook-form'

const ProfileDataForm = ({onSubmitContainer}) => {

    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        onSubmitContainer(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                Name:
                <input type='text' className={style.infoInput} {...register('fullName')} />

            </div>

            <div>
                <label htmlFor={'lookingForAJob'}>
                    Looking for a job:
                    <input type='checkbox' id={'lookingForAJob'} {...register('lookingForAJob')} />
                </label>
            </div>

            <div>
                My professional skills:
                <input type='text' className={style.infoInput} {...register('lookingForAJobDescription')} />
            </div>

            <div>
                About me:
                <input type='text' className={style.infoInput} {...register('aboutMe')} />
            </div>

            <div>
                {/*Contacts {Object.keys(profile.contacts).map(key => {*/}
                {/*    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />*/}
                {/*})}*/}
            </div>

            <button type={'submit'} className={style.editBtn} >Save</button>

        </form>
    )
}

export default ProfileDataForm