
import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  Container, Dropdown, Form, InputGroup, Navbar } from 'react-bootstrap'

import axios from 'axios'
import { imagesData } from '../../common/commomimages/imagedata'



function Header () {

    const [user,setUser] = useState()
    const navigate = useNavigate()
    const logout = () => {
            localStorage.clear()
            navigate('/')
      
        
    }

    const fetchUser = () => {
        let my_token = localStorage.getItem('token');
        const config = { headers: { "Authorization": `Token ${my_token}`, "Content-Type": "application/json" } };
    
        axios.get(`http://localhost:8000/rest-auth/user/`, config).then((res) => {
          setUser(res.data)
          
         
        }).catch(err => console.log(err))
    
      }
    
  

    document.addEventListener("click", function(){
        document.querySelector(".search-result")?.classList.add("d-none")
    });
	

  const Darkmode = () => {
  
    if(document.querySelector(".app").classList.contains('dark-mode')){
        document.querySelector(".app").classList.remove('dark-mode');
        let DarkMenu1 = document.querySelector("#myonoffswitch1") //light theme
        DarkMenu1.checked = true;
        let DarkMenu2 = document.querySelector("#myonoffswitch6")  // light header
        DarkMenu2.checked = true;
        let DarkMenu3 = document.querySelector("#myonoffswitch3")  //light menu
        DarkMenu3.checked = true;
      }
      else{
        document.querySelector(".app").classList.add('dark-mode');
        let DarkMenu1 = document.querySelector("#myonoffswitch2") //dark theme
        DarkMenu1.checked = true;
        let DarkMenu2 = document.querySelector("#myonoffswitch8") //dark header
        DarkMenu2.checked = true;
        let DarkMenu3 = document.querySelector("#myonoffswitch5") //dark menu
        DarkMenu3.checked = true;
      }
  }

  // FuScreen-start
function Fullscreen () {
    if (
      (document.fullScreenElement && document.fullScreenElement === null) ||
          (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

const SideMenuIcon = () => {
    //leftsidemenu
        document.querySelector(".app").classList.toggle("sidenav-toggled");
  }

useEffect(()=>{
    fetchUser();
},[])

  return (
        <Fragment>

           
            <div className="app-header header sticky" style={{ marginBottom: '-70.7812px' }}>
                <Container fluid className=" main-container">
                    <div className="d-flex">
                        <Link aria-label="Hide Sidebar" className="app-sidebar__toggle" data-bs-toggle="sidebar"
                       
                        onClick={() => SideMenuIcon()}

                            to="#"></Link>
                  
                        <Link className="logo-horizontal" to={`${import.meta.env.BASE_URL}dashboard`}>
                            <img src={imagesData('media')} className="header-brand-img main-logo"
                                alt="QT logo" />

                        </Link>
                       
                        
                        <Navbar className="d-flex order-lg-2 ms-auto header-right-icons px-0" expand="lg">
                            <Dropdown className="d-none">
                                <Dropdown.Toggle as="a" href="#" variant='light' className="no-caret nav-link icon " >
                                    <i className="fe fe-search"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" header-search dropdown-menu-start">
                                    <InputGroup className=" w-100 p-2">
                                        <Form.Control type="text"  placeholder="Search...." />
                                        <InputGroup.Text variant='primary' className=" btn btn-primary me-2">
                                            <i className="fe fe-search" aria-hidden="true"></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Dropdown.Menu>
                            </Dropdown>
                          
                            <Navbar.Toggle className="navbar-toggler navresponsive-toggler d-lg-none ms-auto" type="button"
								data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent-4"
								aria-controls="navbarSupportedContent-4" aria-expanded="false"
								aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon fe fe-more-vertical"></span>
                            </Navbar.Toggle>
                            <div className="responsive-navbar p-0">
                                <Navbar.Collapse className="" id="navbarSupportedContent-4">
                                    <div className="d-flex order-lg-2">
                                        <Dropdown className=" d-lg-none d-flex">
                                            <Dropdown.Toggle as='a' to="#" className=" no-caret nav-link icon"
                                                data-bs-toggle="dropdown">
                                                <i className="fe fe-search"></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className=" header-search dropdown-menu-start">
                                                <InputGroup className="w-100 p-2">
                                                    <Form.Control type="text"  placeholder="Search...." />
                                                    <InputGroup.Text className="input-group-text btn btn-primary">
                                                        <i className="fa fa-search" aria-hidden="true"></i>
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                           
                
                
                                     
                                           
                                     
                                        <div className="d-flex country"  onClick={() => Darkmode()}>
                                            <Link to='#' className="nav-link icon theme-layout nav-link-bg layout-setting">
                                                <span className="dark-layout mt-1"><i className="ri-moon-clear-line"></i></span>
                                                <span className="light-layout mt-1"><i className="ri-sun-line"></i></span>
                                            </Link>
                                        </div>
                                      
                                       

                                       
                                        
                                        <div className="dropdown d-flex">
                                            <Link className="nav-link icon full-screen-link" id="fullscreen-button" onClick={Fullscreen}>
                                                <i className="ri-fullscreen-exit-line fullscreen-button"></i>
                                            </Link>
                                        </div>
                             
                                      
                                        
                                        <Dropdown className="dropdown d-flex profile-1">
                                            <Dropdown.Toggle as='a' variant='' className="no-caret nav-link leading-none d-flex">
                                            <i className="fa fa-user"></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-arrow"
                                                data-bs-popper="none">
                                                <div className="drop-heading">
                                                    <div className="text-center">
                                                        <h5 className="text-dark mb-0 fw-semibold">{user?.email}</h5>
                                                        <span className="text-muted fs-12">{user?.roles.map(el=>el.name).join(", ")}</span>
                                                    </div>
                                                </div>
                                                <Dropdown.Item className="text-dark fw-semibold border-top" href={`${import.meta.env.BASE_URL}profile`}>
                                                    <i className="dropdown-icon fe fe-user"></i> Profile
                                                </Dropdown.Item>
                           
                                                <Dropdown.Item className="text-dark fw-semibold" onClick={logout}>
                                                    <i className="dropdown-icon fe fe-log-out"></i> Sign
                                                    out
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Navbar.Collapse>
                            </div>
                            
                        </Navbar>
                    </div>
                </Container>
            </div>
            <div className="jumps-prevent" style={{ paddingTop: '70.7812px' }}></div>
            
        </Fragment>)
}
export default Header
