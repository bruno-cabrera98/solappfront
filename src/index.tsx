import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';
import store from "./store";
import {Provider} from "react-redux";
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from "react-router-dom";
import React from 'react';

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

serviceWorker.register()