import React from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import {Navigate, Route, Routes} from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import HeaderComponent from './components/Header/HeaderContainer'
import Login from './components/Login/Login'

const App = () => {
    return (
        <div className='appWrapper'>
            <HeaderComponent/>
            <NavBar/>
            <div className='appWrapperContent'>
                <Routes>
                    <Route path='/' element={<Navigate to='/login'/>} />
                    <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                    <Route path='/users' element={<UsersContainer/>}/>
                    <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
