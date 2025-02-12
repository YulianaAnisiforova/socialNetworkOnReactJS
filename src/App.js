import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import NavBar from './components/NavBar/NavBar'
import {Route, Routes} from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from './components/Profile/ProfileContainer'

const App = () => {
    return (
        <div className='appWrapper'>
            <Header/>
            <NavBar/>
            <div className='appWrapperContent'>
                <Routes>
                    <Route path='/profile/*' element={<ProfileContainer/>}/>
                    <Route path='/users' element={<UsersContainer/>}/>
                    <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App
