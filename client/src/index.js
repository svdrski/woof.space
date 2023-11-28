import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {UserDataContext} from './Components/UserDataContext'
import { MessengerDataContext } from './Components/Context/MessengerContext';
import { SearchDataContext } from './Components/Context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserDataContext>
        <MessengerDataContext>
            <SearchDataContext>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </SearchDataContext>
        </MessengerDataContext>
    </UserDataContext>
);

