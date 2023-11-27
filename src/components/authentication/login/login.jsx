import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'
import { Card, Col, InputGroup, Row } from 'react-bootstrap'
import { authLogin } from '../../../common/redux/action'
import { imagesData } from '../../../common/commomimages/imagedata';

const Login = ({authLogin,isAuthenticated,role}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const onSubmit = async e => {
    // setloading(true)
    e.preventDefault();
    authLogin(email, password);

  }
  if (isAuthenticated) {
      return <Navigate replace to={`/taskboard`} />
  }

  return (
    <Fragment>

      
<div className="page_content">
        <div className="container text-center text-dark" style={{marginTop:200}}>
          <Row>
            <Col lg={4} className=" d-block mx-auto">
              <Row>
                <Col xl={12} md={12}>
                  <Card>
                    <Card.Body>
                      <div className="text-center mb-2">
                        <Link className="header-brand1" to={`${import.meta.env.BASE_URL}dashboard`}>
                          <img src={imagesData('media')}
                            className="header-brand-img main-logo" alt="Sparic logo" style={{width:200,height:100}} />
                        </Link>
                      </div>
                      <h3>Login</h3>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="input-group mb-3">
                        <span className="input-group-addon bg-white"><i className="fa fa-user text-dark"></i></span>
                        <input onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" placeholder="Username" required/>
                      </InputGroup>
                      <InputGroup className="input-group mb-4">
                        <span className="input-group-addon bg-white"><i
                          className="fa fa-unlock-alt text-dark"></i></span>
                        <input onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" required/>
                      </InputGroup>
                      <Row>
                        <div>
                          <button onClick={(e)=>onSubmit(e)} className="btn btn-primary btn-block">Login</button>
                        </div>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        </div>
    

    </Fragment>
  )
}

export default connect(null, { authLogin })(Login);