import React from 'react'
import style from './Login.module.css'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {AppStateType} from '../../redux/store'
import {login} from '../../redux/authReducer'

type PropsType = {}

const Login: React.FC<PropsType> = () => {

    const isAuth = useSelector((state: AppStateType) =>state.auth.isAuth)
    const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL)
    const dispatch = useDispatch()

    const onSubmitContainer = (data: any) => {
        dispatch(login(data.email, data.password, data.rememberMe, data.captcha))
    }

    if (isAuth) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={style.loginBox}>
            <div className={style.header}>
                <span>Login</span>
            </div>
            <LoginForm captchaURL={captchaURL} onSubmitContainer={onSubmitContainer}/>
        </div>
    )
}

type LoginFormType = {
    onSubmitContainer: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void,
    captchaURL: string | null,
}

const LoginForm: React.FC<LoginFormType> = ({onSubmitContainer, captchaURL}) => {

    const loginError = useSelector((state: AppStateType) => state.auth.loginError)

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


    const onSubmit = (data: any) => {
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
                    {/*{errors?.email && <p>{errors?.email?.message || 'Error'}</p>}*/}
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
                    {/*{errors?.password && <p>{errors?.password?.message || 'Error'}</p>}*/}
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

export default Login

// const mapStateToProps = (state: AppStateType) => ({
//     isAuth: state.auth.isAuth,
//     captchaURL: state.auth.captchaURL,
// })
//
// export default connect(mapStateToProps, {login})(Login)