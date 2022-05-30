import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from "./reportWebVitals";

// 👇️ IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file
const rootElement = document.getElementById('root');
const root = createRoot(rootElement as Element);

// 👇️ if you use TypeScript, add non-null (!) assertion operator
// const root = createRoot(rootElement!);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);

serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
