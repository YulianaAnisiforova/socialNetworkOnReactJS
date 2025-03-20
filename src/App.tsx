import React, {Suspense, useState} from 'react'
import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header'
import Preloader from './components/Common/Preloader/Preloader'
import {Footer} from 'antd/lib/layout/layout'
import {News} from './components/News/News'
import {Music} from './components/Music/Music'
import {Settings} from './components/Settings/Settings'

const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const Login = React.lazy(() => import('./components/Login/Login'))
const Chat = React.lazy(() => import('./components/Chat/Chat'))

const App: React.FC = () => {
    return (
        <div className='appWrapper'>
            <Header/>
            <NavBar/>
            <div className='appWrapperContent'>
                <Suspense fallback={<Preloader/>}>
                    <Routes>
                        <Route path='/' element={<Navigate to='/login'/>}/>
                        <Route path='/profile/:userId?' element={<ProfileContainer />}/>
                        <Route path='/users' element={<UsersContainer />}/>
                        <Route path='/dialogs/*' element={<Dialogs/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/chat' element={<Chat/>}/>
                        <Route path='*' element={<div>404 not found</div>}/>
                    </Routes>
                </Suspense>
                <Footer style={{ textAlign: 'center' , backgroundColor: 'transparent'}}>
                    Samurai Social Network ©{new Date().getFullYear()} Created by Yuliana Anisiforova
                </Footer>
            </div>
        </div>
    )
}



export default App
