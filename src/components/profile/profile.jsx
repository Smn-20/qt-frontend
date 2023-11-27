import React, { useState, Fragment, useEffect } from "react";
import { imagesData } from "../../common/commomimages/imagedata";
import { useParams } from "react-router-dom";
import {
  Modal,
  Form,
  Button,
  Card,
  Col,
  Row,
  Tab,
} from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [names, setNames] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roles, setRoles] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    const postObj = {
      id:profile?.id,
      email: email,
      names: names,
      phone: phone,
      address: address,
      roles: typeof(selectedRoles[0])=='number'?selectedRoles:selectedRoles.map(el=>el.id),
    };
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`http://localhost:8000/update-user/`, postObj)
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

  useEffect(() => {
    let my_token = localStorage.getItem('token');
    const config = { headers: { "Authorization": `Token ${my_token}`, "Content-Type": "application/json" } };
    axios
      .get(`http://localhost:8000/rest-auth/user/`,config)
      .then((response) => {
        setProfile(response.data);
        setEmail(response.data.email)
        setNames(response.data.names)
        setPhone(response.data.phone)
        setAddress(response.data.address)
        setSelectedRoles(response.data.roles)
        fetchRoles();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, []);

  return (
    <Fragment>
      {profile ? (
        <Row className="row">
          <Col xl={12} className="col-xl-12">
            <Tab.Container defaultActiveKey="first">
              <Card className="overflow-hidden">
                <Card.Body>
                  <img
                    className="profile-bg h-250 cover-image w-100"
                    src={imagesData("banner")}
                  />
                  <div className="py-4 position-relative">
                    <div className="profile-img">
                      <img
                        src={imagesData("userIcon")}
                        className="avatar avatar-xxl br-7"
                        alt="person-image"
                      />
                    </div>
                    <div className="mt-5 d-sm-flex align-items-center">
                      <div>
                        <h3 className="fw-semibold mb-1">
                          Email: {profile.email}
                        </h3>
                        <p className="mb-0 fw-semibold text-muted-dark">
                          Role(s): {profile.roles.map(el=>el.name).join(", ")}
                        </p>
                        <p className="mb-0 fw-semibold text-muted-dark">
                          Names: {profile.names}
                        </p>
                        <p className="mb-0 fw-semibold text-muted-dark">
                          Phone Number: {profile.phone}
                        </p>
                        <p className="mb-0 fw-semibold text-muted-dark">
                          Address: {profile.address}
                        </p>
                      </div>
                    </div>
                    <Row style={{marginTop:20}}>
                      <Col lg={3}>
                        <Button onClick={handleShow}>Update</Button>
                      </Col>
                      <Col lg={3}>
                        <Button>Change Password</Button>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            
            </Tab.Container>
          </Col>
        </Row>
      ) : (
        <p>No Profile yet...</p>
      )}
      

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Update user</Modal.Title>
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
                    value={email}
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
                    value={names}
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
                    value={phone}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col lg={6} style={{marginTop:10}}>
                <Form.Group className="form-group">
                  <Form.Label>Roles</Form.Label>
                  <Select
                    isMulti
                    defaultValue={selectedRoles.map((role) => {
                      return {
                        value: role.id,
                        label: role.name,
                      };
                    })}
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

      
    </Fragment>
  );
}