import React from 'react'

const MenuItems = [
  {
    menutitle: 'MENU',
    Items: [
     
      
      {
        icon: (<i class="side-menu__icon fa fa-tasks"></i>),
        type: 'sub',
        Name:'',
        active: false,
        selected: false,
        title: 'Task Board',
        class:'',
        color:'',
        badgetxt:'',      
        path: `${import.meta.env.BASE_URL}taskboard`
      },
       {
        icon: (<i class="side-menu__icon fa fa-user"></i>),
        type: 'sub',
        Name:'',
        active: false,
        selected: false,
        title: 'Access Control',
        class:'',
        color:'',
        badgetxt:'',      
        path: `${import.meta.env.BASE_URL}access-control`
      },
    ]
  },
  


]
export default MenuItems
