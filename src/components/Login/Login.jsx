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
        alert(JSON.stringify(data))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputWrapper}>
                <input className={style.loginInput} placeholder={'e-mail'} {...register('email', {
                    required: 'This field is required.',
                    pattern: {
                        // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0]{2,4}&/i,
                        value: /\S+@\S+\.\S+/,
                        message: 'Invalid e-mail address.',
                    }
                })} />
                <div className={style.errorMsg}>
                    {errors?.email && <p>{errors?.email?.message || 'Error'}</p>}
                </div>
            </div>
            <div className={style.inputWrapper}>
                <input className={style.loginInput} placeholder={'password'} type={'password'} {...register('password', {
                    required: 'This field is required.',
                    minLength: {
                        value: 7,
                        message: 'Password should be at least 7 characters.',
                    }
                })} />
                <div className={style.errorMsg}>
                    {errors?.password && <p>{errors?.password?.message || 'Error'}</p>}
                </div>
            </div>
            <div className={style.checkWrapper}>
                <label htmlFor={'remember'}>
                    <input className={style.checkbox} id={'remember'} type={'checkbox'} {...register('rememberMe')} />
                    <span>remember me</span>
                </label>
            </div>
            <div className={style.btnWrapper}>
                <button type={'submit'} className={style.loginBtn} disabled={!isValid}>login</button>
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