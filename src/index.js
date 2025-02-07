import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import store from "./redux/reduxStore";
import {Provider} from "react-redux";

window.store = store

const root = ReactDOM.createRoot(document.getElementById('root'))
let rerenderEntireTree = (state) => {

    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>

                    <App />
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    )
}

rerenderEntireTree(store.getState())

store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state)
})

reportWebVitals()