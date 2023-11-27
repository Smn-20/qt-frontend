import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Button,
  Form,
  Modal,
  InputGroup,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

function AccessControl() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [names, setNames] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState();
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const postObj = {
      email: email,
      names: names,
      phone: phone,
      address: address,
      password: password,
      roles: selectedRoles,
    };
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`http://localhost:8000/register/`, postObj)
      .then((res) => {
          fetchUsers()
          setLoading(false);
          setShow(false);
          alert(res.data.message)
      })
      .catch((error) => {
        setLoading(false);
        setShow(false);
        console.log(error.message);
      });
  };

  const fetchUsers = async () => {
    let my_token = localStorage.getItem("token");
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const response = await axios.get(`http://localhost:8000/users/`, config);
      setUsers(response.data);
      fetchRoles();
    } catch (error) {
      console.error("Error fetching payrolls:", error);
    }
  };

  const fetchRoles = async () => {
    let my_token = localStorage.getItem("token");
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const response = await axios.get(`http://localhost:8000/roles/`, config);
      setRoles(
        response.data.map((role) => {
          return {
            value: role.id,
            label: role.name,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching payrolls:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title>Users</Card.Title>
              <Button variant="primary" onClick={handleShow}>
                Register New User
              </Button>
            </Card.Header>
            <Card.Body>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr style={{ background: "#FD905E" }}>
                    <th style={{ color: "white", fontWeight: "bold" }}>N#</th>

                    <th style={{ color: "white", fontWeight: "bold" }}>
                      Email
                    </th>

                    <th style={{ color: "white", fontWeight: "bold" }}>
                      Names
                    </th>

                    <th style={{ color: "white", fontWeight: "bold" }}>
                      Phone
                    </th>

                    <th style={{ color: "white", fontWeight: "bold" }}>
                      Address
                    </th>

                    <th style={{ color: "white", fontWeight: "bold" }}>
                      Roles
                    </th>

                    <th style={{ color: "white", fontWeight: "bold" }}>
                      Status
                    </th>

                    {/* <th style={{ color: "white", fontWeight: "bold" }}>
                      Actions
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {users?.length > 0 ? (
                    users.map((user_, index) => (
                      <tr key={user_.id}>
                        <td style={{ color: "black" }}>{index + 1}</td>

                        <td style={{ color: "black" }}>{user_.email}</td>

                        <td style={{ color: "black" }}>{user_.names}</td>

                        <td style={{ color: "black" }}>{user_.phone}</td>

                        <td style={{ color: "black" }}>{user_.address}</td>

                        <td style={{ color: "black" }}>
                          {user_.roles.map((role_) => role_.name).join(", ")}
                        </td>

                        {user_.is_active ? (
                          <td className="bg-secondary-transparent text-secondary">
                            Active
                          </td>
                        ) : (
                          <td className="bg-danger-transparent text-danger">
                            Inactive
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No user yet...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Register New user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={6} style={{marginTop:10}}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="form-control"
                    name="example-text-input"
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} style={{marginTop:10}}>
                <Form.Group>
                  <Form.Label>Names</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    name="example-text-input"
                    placeholder="Names..."
                    onChange={(e) => setNames(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} style={{marginTop:10}}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    name="example-text-input"
                    placeholder="Phone..."
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} style={{marginTop:10}}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    name="example-text-input"
                    placeholder="Address..."
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} style={{marginTop:10}}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control"
                    name="example-text-input"
                    placeholder="Password..."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col lg={6} style={{marginTop:10}}>
                <Form.Group className="form-group">
                  <Form.Label>Roles</Form.Label>
                  <Select
                    isMulti
                    options={roles}
                    onChange={(e) => setSelectedRoles(e.map((r) => r.value))}
                    classNamePrefix="Select2"
                    className="multi-select"
                    placeholder="Select them"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default AccessControl;
