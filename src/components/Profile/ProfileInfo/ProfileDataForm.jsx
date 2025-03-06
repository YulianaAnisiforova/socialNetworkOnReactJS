import React from 'react'
import style from './ProfileInfo.module.css'
import {useForm} from 'react-hook-form'

const ProfileDataForm = ({profile, onSubmitContainer, contactsError}) => {
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe,
            'contacts.facebook': profile.contacts.facebook,
            'contacts.website': profile.contacts.website,
            'contacts.vk': profile.contacts.vk,
            'contacts.twitter': profile.contacts.twitter,
            'contacts.instagram': profile.contacts.instagram,
            'contacts.youtube': profile.contacts.youtube,
            'contacts.github': profile.contacts.github,
            'contacts.mainLink': profile.contacts.mainLink,
        }
    })

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
                {Object.keys(profile.contacts).map(key => {
                    return (
                        <div key={key}>
                            {key}: <input type='text' className={style.infoInput} {...register(`contacts.${key}`)} />
                        </div>
                    )
                })}
            </div>
            <div className={style.errorMsg}>
                {contactsError}
            </div>
            <button type={'submit'} className={style.editBtn} >Save</button>

        </form>
    )
}

export default ProfileDataForm