import React from 'react'
import style from './Login.module.css'

const LoginForm = () => {
    return (
            <form>
                <div>
                    <input className={style.loginInput} placeholder={'e-mail'}/>
                </div>
                <div>
                    <input className={style.loginInput} placeholder={'password'}/>
                </div>
                <div>
                    <input className={style.checkbox} name={'remember'} type={'checkbox'}/>
                    <label for={'remember'}>remember me</label>
                </div>
                <div>
                    <button className={style.loginBtn}>login</button>
                </div>
            </form>
    )
}

const Login = () => {
    return (
        <div>
            <span className={style.header}>Login</span>
            <LoginForm />
        </div>
    )
}

export default Login