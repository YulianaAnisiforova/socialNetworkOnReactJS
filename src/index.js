import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {addPost, subscribe, updateNewPostText} from './redux/state'
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import state from "./redux/state";

const root = ReactDOM.createRoot(document.getElementById('root'))
let rerenderEntireTree = (state) => {

    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
            </BrowserRouter>
        </React.StrictMode>
    )
}

export default rerenderEntireTree

rerenderEntireTree(state)

subscribe(rerenderEntireTree)

reportWebVitals()
