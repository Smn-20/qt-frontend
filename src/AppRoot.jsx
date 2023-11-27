import React, { Fragment, Suspense, lazy } from 'react'
import * as actions from './common/redux/action'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.scss'
import { Routingdata } from './common/routingdata'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'

const App = lazy(() => import('./layouts/App'))
const Loaderimage = lazy(() => import('./layouts/loader/loader'))


// Authentication 

const Login = lazy(() => import('./components/authentication/login/login')) 
const Register = lazy(() => import('./components/Authentication/Register/Register'))

class AppRoot extends React.Component {

    componentDidMount() {
      this.props.onTryAutoSignup();
    }
  
    render() {
    return (
      <Fragment>
   
      <BrowserRouter>
        <Suspense fallback={<Loaderimage />}>
          <Routes>
  
              <Route index element={<Login {...this.props} />} />
              <Route path={`${import.meta.env.BASE_URL}authentication/register`} element={<Register />} />
        
          

              <Route element={<PrivateRoute />}>
              <Route path={`${import.meta.env.BASE_URL}`} element={<App {...this.props}/>} >
                {Routingdata.map((idx) => (
                <Route path={idx.path} element={idx.element} />
                ))}
              </Route>
              </Route>
  
          
  
          
           
          </Routes>
  
        </Suspense>
  
      </BrowserRouter>
  
    </Fragment>
      )
  }
  }
  
  const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null,
      role: state.role
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);