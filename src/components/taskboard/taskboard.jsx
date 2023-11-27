import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Row,
  Table,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";

const Taskboard = () => {
  const [summary, setSummary] = useState({});
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [task, setTask] = useState("");
  const [statustype, setstatusType] = useState("");



  const fetchAssignees = async () => {
    let my_token = localStorage.getItem("token");
    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .get(`http://localhost:8000/list-staff/`, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          const assignees_ = res.data.map((emp) => {
            return {
              value: emp.id,
              label: emp.first_name + " " + emp.last_name,
            };
          });
          setAssignees(assignees_);
        } else {
          console.log("Failed!");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const chossefiletype = [
    { value: "PENDING", label: "PENDING" },
    { value: "Not Started", label: "Not Started" },
    { value: " Completed", label: " Completed" },
  ];

  useEffect(() => {
    fetchAssignees();
  }, []);
  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title>Taskboard</Card.Title>
          <Button onClick={() => setShow(true)} variant="primary" type="button">
            Create Task
          </Button>
        </Card.Header>

        <Card.Body>
          <Row>
            <Col xl={4} lg={4} md={6} sm={6}>
              <Card className="card overflow-hidden" style={{ height: "100%" }}>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-0 fw-semibold">Task Name</h5>
                    <button onClick={() => setShow2(true)} className="btn btn-primary btn-sm">Update</button>
                  </div>
                  <p className="text-muted">Task Description</p>
                  <p className="text">
                    Assigned Employee{" "}
                    <span className="bg-secondary-transparent text-secondary">
                      : John Doe
                    </span>
                  </p>
                  <p className="text">
                    Status{" "}
                    <span className="bg-primary-transparent text-primary">
                      : In Progress
                    </span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={4} lg={4} md={6} sm={6}>
              <Card className="card overflow-hidden" style={{ height: "100%" }}>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-0 fw-semibold">Task Name</h5>
                    <button onClick={() => setShow2(true)} className="btn btn-primary btn-sm">Update</button>
                  </div>
                  <p className="text-muted">Task Description</p>
                  <p className="text">
                    Assigned Employee{" "}
                    <span className="bg-secondary-transparent text-secondary">
                      : John Doe
                    </span>
                  </p>
                  <p className="text">
                    Status{" "}
                    <span className="bg-danger-transparent text-danger">
                      : Not Started
                    </span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={4} lg={4} md={6} sm={6}>
              <Card className="card overflow-hidden" style={{ height: "100%" }}>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-0 fw-semibold">Task Name</h5>
                    <button onClick={() => setShow2(true)} className="btn btn-primary btn-sm">Update</button>
                  </div>
                  <p className="text-muted">Task Description</p>
                  <p className="text">
                    Assigned Employee{" "}
                    <span className="bg-secondary-transparent text-secondary">
                      : John Doe
                    </span>
                  </p>
                  <p className="text">
                    Status{" "}
                    <span className="bg-success-transparent text-success">
                      : Completed
                    </span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Col lg={12} className="col-md-">
            <Card className="custom-card">
              <Card.Header>
                <Card.Title>Create New Task</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-column">
                  <Row>
                    <Col xl={12}>
                      <Form.Group className="form-group">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="example-text-input"
                          placeholder="Task"
                          onChange={(e) => setTask(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={6}>
                      <Form.Group className="form-group">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="example-text-input"
                          placeholder="Task"
                          onChange={(e) => setTask(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={6}>
                      <Form.Group className="form-group">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="example-text-input"
                          placeholder="Task"
                          onChange={(e) => setTask(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={12}>
                      <Form.Group className="form-group">
                        <Form.Label>Select Assignees</Form.Label>
                        <Select
                          isMulti
                          options={assignees}
                          onChange={(e) => setSelectedAssignees(e.map((emp) => emp.value))}
                          classNamePrefix="Select2"
                          className="multi-select"
                          placeholder="Select them"
                        />
                      </Form.Group>
                    </Col>

                    
                  </Row>

                  <Button className="btn ripple btn-primary my-3">
                    Submit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Modal.Body>
      </Modal>

      <Modal
        show={show2}
        onHide={() => {
          setShow2(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Col lg={12} className="col-md-">
            <Card className="custom-card">
              <Card.Header>
                <Card.Title>Update Task</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-column">
                  <Row>
                    <Col xl={12}>
                      <Form.Group className="form-group">
                        <Form.Label>Select Status</Form.Label>
                        <Select
                          options={chossefiletype}
                          classNamePrefix="Select2"
                          className="multi-select"
                          placeholder=""
                          onChange={(e) => setstatusType(e.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button className="btn ripple btn-primary my-3">
                    Submit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Taskboard;
