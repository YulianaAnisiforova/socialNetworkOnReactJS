import React, {Suspense} from 'react'
import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import HeaderComponent from './components/Header/HeaderContainer'
import Preloader from './components/Common/Preloader/Preloader'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const Login = React.lazy(() => import('./components/Login/Login'))

const App = () => {
    return (
        <div className='appWrapper'>
            <HeaderComponent/>
            <NavBar/>
            <div className='appWrapperContent'>
                <Suspense fallback={<Preloader/>}>
                    <Routes>
                        <Route path='/' element={<Navigate to='/login'/>}/>
                        <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </Suspense>
            </div>
        </div>
    )
}

export default App
