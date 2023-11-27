import React, { Fragment } from 'react'
import ReactDOM from'react-dom/client'
import Taskboard from '../components/taskboard/taskboard'
import AccessControl from '../components/access-control/access-control'
import Profile from '../components/profile/profile'



export const Routingdata=[

{path:`${import.meta.env.BASE_URL}access-control` ,element:<AccessControl />},
{path:`${import.meta.env.BASE_URL}taskboard` ,element:<Taskboard />},
{path:`${import.meta.env.BASE_URL}profile` ,element:<Profile />},

]