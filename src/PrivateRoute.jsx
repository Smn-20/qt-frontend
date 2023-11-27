import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {Navigate,Outlet} from 'react-router-dom';

const PrivateRoute=({isAuthenticated})=>{
    const [authenticated,setAuthenticated]=useState(true)
    useEffect(()=>{
        const token =  localStorage.getItem("token")
        setAuthenticated(token!==null)
    },[])
    return(
    !authenticated  ?<Navigate to='/'/>:<Outlet/>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.token !== null,
    isLoading: state.loading
})
 export default connect(mapStateToProps)(PrivateRoute); 