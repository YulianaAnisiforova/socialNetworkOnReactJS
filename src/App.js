import React from 'react'
import './App.css'
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {Route, Routes} from "react-router-dom";

const App = (props) => {
    return (
        <div className='appWrapper'>
            <Header/>
            <NavBar/>
            <div className='appWrapperContent'>
                <Routes>
                    <Route path='/profile' element={<Profile profilePage={props.state.profilePage}
                                                             updateNewPostText={props.updateNewPostText}
                                                             addPost={props.addPost}/>}/>
                    <Route path='/dialogs/*' element={<Dialogs state={props.state.dialogsPage}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App
