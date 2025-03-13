import React from 'react'
import style from './Login.module.css'
import {useForm} from 'react-hook-form'
import {connect, useSelector} from 'react-redux'
import {login} from '../../redux/authReducer'
import {Navigate, useNavigate} from 'react-router-dom'

// type PropsType = {
//     isAuth: boolean,
//     captchaURL: string,
//     login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
// }

const Login = (props) => {
    if (props.isAuth) {
        // const navigate = useNavigate()
        // navigate('/profile/')
        return <Navigate to='/profile'/>
    }

    return (
        <div className={style.loginBox}>
            <div className={style.header}>
                <span>Login</span>
            </div>
            <LoginForm captchaURL={props.captchaURL} onSubmitContainer={props.login}/>
        </div>
    )
}

const LoginForm = ({onSubmitContainer, captchaURL}) => {

    const loginError = useSelector((state) => state.auth.loginError)

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    })


    const onSubmit = (data) => {
        onSubmitContainer(data.email, data.password, data.rememberMe, data.captcha)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputWrapper}>
                <input className={style.loginInput} placeholder={'e-mail'} {...register('email', {
                    required: 'This field is required.',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Invalid e-mail address.',
                    }
                })} />
                <div className={style.errorMsg}>
                    {errors?.email && <p>{errors?.email?.message || 'Error'}</p>}
                </div>
            </div>
            <div className={style.inputWrapper}>
                <input className={style.loginInput} placeholder={'password'}
                       type={'password'} {...register('password', {
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
            <div className={style.errorMsg}>
                {loginError}
            </div>
            <div className={style.checkWrapper}>
                <label htmlFor={'remember'}>
                    <input className={style.checkbox} id={'remember'} type={'checkbox'} {...register('rememberMe')} />
                    <span>remember me</span>
                </label>
            </div>

            <div className={style.captchaWrapper}>
                {captchaURL && <img src={captchaURL} alt='captcha'/> }
            </div>
            <div>
                {captchaURL && <input className={style.loginInput} placeholder={'captcha'}
                                  type={'text'} {...register('captcha', {required: true})} /> }
            </div>

            <div className={style.btnWrapper}>
                <button type={'submit'} className={style.loginBtn} disabled={!isValid}>login</button>
            </div>
        </form>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL,
})

export default connect(mapStateToProps, {login})(Login)