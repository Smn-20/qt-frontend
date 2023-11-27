import React, { Fragment } from 'react'
import logo from '../../../assets/images/brand/logo.png'
import logolight from '../../../assets/images/brand/logo-light.png'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'

export default function Register () {
  return (
    <Fragment>

      <div className="page-content">
        <div className="container text-center text-dark">
          <Row>
            <Col lg={4} className="d-block mx-auto">
              <Row>
                <Col xl={12} md={12}>
                  <Card>
                    <Card.Body>
                      <div className="text-center mb-6">
                        <Link className="header-brand1" to={`${import.meta.env.BASE_URL}dashboard/sales`}>
                          <img src={logo}
                            className="header-brand-img main-logo" alt="Sparic logo" />
                          <img src={logolight}
                            className="header-brand-img darklogo" alt="Sparic logo" />
                        </Link>
                      </div>
                      <h3>Register</h3>
                      <p className="text-muted">Create New Account</p>
                      <InputGroup className="input-group mb-3">
                        <span className="input-group-addon bg-white"><i
                          className="fa fa-user w-4 text-muted-dark"></i></span>
                        <input type="text" className="form-control" placeholder="Entername" />
                      </InputGroup>
                      <InputGroup className="input-group mb-4">
                        <span className="input-group-addon bg-white"><i
                          className="fa fa-envelope  text-muted-dark w-4"></i></span>
                        <input type="text" className="form-control" placeholder="Enter Email" />
                      </InputGroup>
                      <InputGroup className="input-group mb-4">
                        <span className="input-group-addon bg-white"><i
                          className="fa fa-unlock-alt  text-muted-dark w-4"></i></span>
                        <input type="password" className="form-control" placeholder="Password" />
                      </InputGroup>
                      <Form.Group className="form-group">
                        <Form.Label className="custom-control custom-checkbox text-start">
                          <input type="checkbox" className="custom-control-input" />
                          <span className="custom-control-label">Agree the <Link to={`${import.meta.env.BASE_URL}pages/extension/terms`}>terms
                            and policy</Link></span>
                        </Form.Label>
                              
                      </Form.Group>
                      <Row>
                        <div>
                          <Button variant='primary' href={`${import.meta.env.BASE_URL}dashboard/sales`} className="btn btn-block px-4">Create a
                            new account</Button>
                        </div>
                      </Row>
                      <div className="mt-6 btn-list">
                        <Button variant='facebook' type="button" className="btn-icon "><i
                          className="fa fa-facebook"></i></Button>
                        <Button variant='google' type="button" className="btn-icon "><i
                          className="fa fa-google"></i></Button>
                        <Button variant='twitter' type="button" className="btn-icon"><i
                          className="fa fa-twitter"></i></Button>
                        <Button variant='dribbble' type="button" className="btn-icon "><i
                          className="fa fa-dribbble"></i></Button>
                      </div>
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
