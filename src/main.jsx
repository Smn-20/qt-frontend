import React, { Fragment, Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'; 
import store from './common/redux/store';
import './index.scss'
import AppRoot from './AppRoot'




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
  <AppRoot/>
  </React.StrictMode>
  </Provider>
)



