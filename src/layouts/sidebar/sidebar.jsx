
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import icon from '../../assets/images/brand/fav-icon.jpeg'
import axios from 'axios'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useEffect } from 'react'
import { Badge } from 'react-bootstrap'
import { imagesData } from '../../common/commomimages/imagedata'
const Onhover = () => {
  document.querySelector(".app").classList.contains("sidenav-toggled")
  document.querySelector(".app").classList.add("sidenav-toggled-open");

}
const Outhover = () => {
  document.querySelector(".app").classList.remove("sidenav-toggled-open");
}

export default function Sidebar() {
  

  const [menuItems, setMenuItems] = useState([])

  const fetchUser = () => {
    let my_token = localStorage.getItem('token');
    const config = { headers: { "Authorization": `Token ${my_token}`, "Content-Type": "application/json" } };

    axios.get(`http://localhost:8000/rest-auth/user/`, config).then((res) => {
      console.log(res.data)
      const newMenuItems = [

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
          path: `${import.meta.env.BASE_URL}taskboard`,
          condition: true
        },
       
        {
          icon: (<i className="side-menu__icon fa fa-user"></i>),
          type: 'sub',
          Name:'',
          active: false,
          selected: false,
          title: 'My Profile',
          class:'',
          color:'',
          badgetxt:'',      
          path: `${import.meta.env.BASE_URL}profile`,
          condition: true
        },
       
        
        
         {
          icon: (<i class="side-menu__icon fa fa-users"></i>),
          type: 'sub',
          Name:'',
          active: false,
          selected: false,
          title: 'Access Control',
          class:'',
          color:'',
          badgetxt:'',      
          path: `${import.meta.env.BASE_URL}access-control`,
          condition: res.data.roles?.map(role_=>role_.name).includes('ADMIN')
        },
      ]
      
      setMenuItems([{menutitle:"MENU",Items:newMenuItems.filter(el=>el.condition)}])
     
    }).catch(err => console.log(err))

  }

 




  useEffect(() => {
    fetchUser();
 
  }, []);
  // every chnage this effect calls
  let menuIcontype;
  if (document.querySelector("body").classList.contains("horizontal")) {
    menuIcontype = "hor-icon";
  } else {
    menuIcontype = "sidemenu-icon";
  }





 
  window.addEventListener("resize", () => {
    checkHoriMenu();
  });

  function checkHoriMenu() {
    let menuWidth = document.querySelector(".horizontal-main");
    let menuItems = document.querySelector(".side-menu");
    let mainSidemenuWidth = document.querySelector(".main-sidemenu");
    let menuContainerWidth = menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
    let marginLeftValue = Math.ceil(Number(window.getComputedStyle(menuItems)?.marginLeft.split("px")[0]));
    let marginRightValue = Math.ceil(Number(window.getComputedStyle(menuItems)?.marginRight.split("px")[0]));
    let check = menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;
    if (menuWidth?.offsetWidth - menuContainerWidth >= menuItems.scrollWidth) {
      document.querySelector(".slide-left").classList.add("d-none");
      document.querySelector(".slide-right").classList.add("d-none");
      menuItems.style.marginRight = 0;
      menuItems.style.marginLeft = 0;

    }
    else {
      document.querySelector(".slide-right").classList.remove("d-none");
    }
    if (document.querySelector("html").getAttribute("dir") === "rtl") {
      if ((Math.abs(marginRightValue) < Math.abs(check)) === false && (menuWidth?.offsetWidth - menuContainerWidth < menuItems.scrollWidth)
      ) {
        menuItems.style.marginRight = -check + 'px';
        document.querySelector(".slide-left").classList.remove("d-none");
      } else {
        menuItems.style.marginRight = 0;
      }
    } else {
      if (
        (Math.abs(marginLeftValue) < Math.abs(check)) === false &&
        (menuWidth?.offsetWidth - menuContainerWidth < menuItems.scrollWidth)
      ) {
        menuItems.style.marginLeft = -check + 'px';
        document.querySelector(".slide-right").classList.add("d-none");
      } else {
        menuItems.style.marginLeft = 0;
      }
    }
  }

  return (
    <Fragment>
  

      <div className="sticky" 
           >
        <div className="app-sidebar"
          onMouseOver={() => Onhover()}
          onMouseOut={() => Outhover()}
        >
          <PerfectScrollbar options={{ suppressScrollX: true, useBothWheelAxes: false }}>
            <div className="side-header">
              <Link className="header-brand1" to={`${import.meta.env.BASE_URL}taskboard`} >
                <img src={imagesData('media')} className="header-brand-img main-logo" alt="Sparic logo" />
                <img src={imagesData('media')} className="header-brand-img darklogo" alt="Sparic logo" />
                <img src={icon} className="header-brand-img icon-logo" alt="Sparic logo" />
                <img src={icon} className="header-brand-img icon-logo2" alt="Sparic logo" />
              </Link>
            </div>
          

            <div className="main-sidemenu">
             

              <ul className='side-menu' style={{ marginRight: "0px" }}>
                {menuItems.map((firstlayer) => (
                  <React.Fragment key={Math.random()}>
                    <li className="sub-category"><h3>{firstlayer.menutitle}</h3></li>
                    {firstlayer.Items.map((secondlayer, two) =>
                    (
                      <li className="slide" key={two}>
                          <Link
                            to={secondlayer.path}
                            className={`side-menu__item ${secondlayer.selected ? "active" : ""
                              }`} >

                            {secondlayer.icon}
                            <span className="side-menu__label">
                              {secondlayer.title}
                            </span>
                            {secondlayer.badgetxt ? (
                              <Badge bg={secondlayer.color} className={secondlayer.class}>
                                {secondlayer.badgetxt}
                              </Badge>
                            ) : (
                              ""
                            )}
                            

                          </Link>

                       
                        
                      </li>
                    ))}

                  </React.Fragment>
                ))}
              </ul>

            </div>
          </PerfectScrollbar>
        </div>
      </div>
     

    </Fragment>
  )
}

