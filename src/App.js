import React from 'react'
import './App.css'
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

const App = (props) => {
    return (
        <div className='appWrapper'>
            <Header/>
            <NavBar/>
            <div className='appWrapperContent'>
                <Routes>
                    <Route path='/profile' element={<Profile profilePage={props.state.profilePage}
                                                             dispatch={props.dispatch} />}/>
                    <Route path='/dialogs/*' element={<DialogsContainer dialogsPage={props.state.dialogsPage}
                                                               dispatch={props.dispatch}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App
