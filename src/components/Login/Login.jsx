import React from 'react'
import style from './Login.module.css'
import {useForm} from 'react-hook-form'

const LoginForm = () => {
    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur"
    })

    const onSubmit = (data) => {
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputWrapper}>
                <input className={style.loginInput} placeholder={'e-mail'} {...register('email', {
                    required: 'This field is required.',
                })} />
                <div className={style.errorMsg}>
                    {errors?.email && <p>{errors?.email?.message || 'Error'}</p>}
                </div>
            </div>
            <div className={style.inputWrapper}>
                <input className={style.loginInput} placeholder={'password'} {...register('password', {
                    required: 'This field is required.',
                })} />
                <div className={style.errorMsg}>
                    {errors?.email && <p>{errors?.email?.message || 'Error'}</p>}
                </div>
            </div>
            <div className={style.checkWrapper}>
                <input className={style.checkbox} name={'remember'} type={'checkbox'} {...register('rememberMe')} />
                <label for={'remember'}>remember me</label>
            </div>
            <div className={style.btnWrapper}>
                <button className={style.loginBtn} disabled={!isValid}>login</button>
            </div>
        </form>
    )
}

const Login = () => {
    return (
        <div className={style.loginBox}>
            <div className={style.header}>
                <span>Login</span>
            </div>
            <LoginForm/>
        </div>
    )
}

export default Login