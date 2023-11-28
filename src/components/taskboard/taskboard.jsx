import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Row, Modal, Form } from "react-bootstrap";
import fileDownload from "js-file-download";
import Select from "react-select";
import Pagination from "../../common/pagination/Pagination";
import { CSVLink } from 'react-csv';

const headers = [
  { label: "Task Name", key: "name" },
  { label: "Creator", key: "created_by" },
  { label: "assignees", key: "assignees" },
  { label: "projects", key: "projects" },
  { label: "start_date", key: "start_date" },
  { label: "end_date", key: "end_date" },
  { label: "priority", key: "priority" },
  { label: "description", key: "description" },
];

const Taskboard = () => {
  const [profile, setProfile] = useState();
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [creator, setCreator] = useState("");
  const [assignees, setAssignees] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tasks_, setTasks_] = useState([]);
  const [task, setTask] = useState("");
  const [taskId, setTaskId] = useState();
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [files, setFiles] = useState();
  const [taskFiles, setTaskFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);

  const searchTasks = (value) => {

    if (value === '') {
      fetchTasks(); // Reset to the original list of projects
    } else {
      const filteredTasks = tasks_.filter((task) => {
        const taskNameLowercase = task.name.toLowerCase();
        const searchTermLowercase = value.toLowerCase();
        return taskNameLowercase.includes(searchTermLowercase)
      });

      setTasks(filteredTasks);
    }
  };

  const fetchUser = () => {
    let my_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Token ${my_token}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`http://localhost:8000/rest-auth/user/`, config)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = tasks.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(tasks.length / recordsPerPage);

  const reset = () => {
    setTask("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setPriority("");
    setSelectedAssignees([]);
    setSelectedProjects([]);
    setFiles([]);
    setStarted(false);
    setCompleted(false);
  };

  // const textareaStyle = {
  //   border: description.length > 49 && isFocused ? '1px solid red' : '1px solid #ced4da',
  // };

  const fetchAssignees = async () => {
    let my_token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${my_token}`,
      },
    };
    axios
      .get(`http://localhost:8000/users/`, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          const assignees_ = res.data.map((user) => {
            return {
              value: user.id,
              label: user.email,
            };
          });
          setAssignees(assignees_);
          fetchProjects();
        } else {
          console.log("Failed!");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const fetchTasks = async () => {
    let my_token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${my_token}`,
      },
    };
    axios
      .get(`http://localhost:8000/tasks/`, config)
      .then((res) => {
        setTasks(res.data);
        setTasks_(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const fetchFiles = async (taskId) => {
    let my_token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${my_token}`,
      },
    };
    axios
      .get(`http://localhost:8000/files/${taskId}/`, config)
      .then((res) => {
        setTaskFiles(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const deleteTask = async (id) => {
    let my_token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${my_token}`,
      },
    };
    axios
      .delete(`http://localhost:8000/task-delete/${id}/`, config)
      .then((res) => {
        setTasks(res.data);
        fetchTasks();
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const fetchProjects = async () => {
    let my_token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${my_token}`,
      },
    };
    axios
      .get(`http://localhost:8000/projects/`, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          const projects_ = res.data.map((pr) => {
            return {
              value: pr.id,
              label: pr.name,
            };
          });
          setProjects(projects_);
        } else {
          console.log("Failed!");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    const formData = new FormData();
    formData.append("name", task);
    formData.append("description", description);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("assignees", selectedAssignees);
    formData.append("projects", selectedProjects);
    formData.append("priority", priority);
    formData.append("created_by", profile?.id);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    let my_token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${my_token}`,
      },
    };
    axios
      .post(`http://localhost:8000/task-create/`, formData, config)
      .then((res) => {
        reset();
        setShow(false);
        fetchUser();
        // setLoading(false);
        alert(res.data.message);
        fetchTasks();
      })
      .catch((error) => {
        reset();
        // setLoading(false);
        setShow(false);
        console.log(error.message);
      });
  };

  const handleDownload = (url, fileName) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, fileName);
      })
      .catch((err) => console.log(err));
  };

  const setValues = (task_) => {
    setTaskId(task_.id);
    setTask(task_.name);
    setDescription(task_.description);
    setStartDate(task_.start_date);
    setEndDate(task_.end_date);
    setPriority(task_.priority);
    setSelectedAssignees(task_.assignees);
    setSelectedProjects(task_.projects);
    setStarted(task_.started);
    setCompleted(task_.completed);
    setCreator(task_.created_by.names);
    if (task_.completed) {
      setStatus("completed");
    } else if (task_.started) {
      setStatus("started");
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    // setLoading(true);
    const postObj = JSON.stringify({
      name: task,
      description: description,
      start_date: startDate,
      end_date: endDate,
      assignees:
        typeof selectedAssignees[0] == "number"
          ? selectedAssignees
          : selectedAssignees.map((el) => el.id),
      projects:
        typeof selectedProjects[0] == "number"
          ? selectedProjects
          : selectedProjects.map((el) => el.id),
      priority: priority,
      started: !!status,
      completed: status == "completed",
    });

    let my_token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${my_token}`,
      },
    };
    axios
      .put(`http://localhost:8000/task-update/${taskId}/`, postObj, config)
      .then((res) => {
        fetchTasks();
        reset();
        setShow2(false);
        fetchUser();
        // setLoading(false);
        if (res.status == 200 || res.status == 201) {
          alert("Task successfully updated");
        }
      })
      .catch((error) => {
        reset();
        // setLoading(false);
        setShow2(false);
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchTasks();
    fetchAssignees();
    fetchUser();
  }, []);
  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title>Taskboard</Card.Title>
          <Row>
            <Col>
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                onChange={(e)=>searchTasks(e.target.value)}
              />
            </Col>
            <Col>
              <Button
                onClick={() => setShow(true)}
                variant="primary"
                type="button"
              >
                Create Task
              </Button>
            </Col>
            <Col>
              <CSVLink filename="Tasks" headers={headers} data={currentRecords.map(el=>{return({
                "name":el.name,
                "created_by":el.created_by.names,
                "assignees":el.assignees.map(el=>el.names).join(", "),
                "projects":el.projects.map(el=>el.name).join(", "),
                "start_date":el.start_date,
                "end_date":el.end_date,
                "priority":el.priority,
                "description":el.description,
              })})}>
              <Button
                variant="none"
                type="button"
              >
                Export Excell <i className="fa fa-download"></i>
              </Button>
              </CSVLink>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Row>
            {currentRecords.length > 0 ? (
              currentRecords.map((task) => {
                return (
                  <Col xl={4} lg={4} md={6} sm={6} style={{ marginTop: 10 }}>
                    <Card
                      className="card overflow-hidden"
                      style={{ height: "100%" }}
                    >
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <h5 className="mb-0 fw-semibold">{task.name}</h5>
                          {task.created_by.id === profile?.id && (
                            <button
                              onClick={() => {
                                setValues(task);
                                setShow2(true);
                              }}
                              className="btn btn-primary btn-sm"
                            >
                              Update
                            </button>
                          )}

                          {task.created_by.id === profile?.id && (
                          <i
                            className="fa fa-trash"
                            title="Delete task"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to delete the task with name ${task.name}?`
                                )
                              ) {
                                deleteTask(task.id);
                              }
                            }}
                            style={{ color: "red", fontSize: 30 }}
                          ></i>
                          )}

                          <i
                            className="fa fa-eye"
                            title="View task details"
                            onClick={() => {
                              fetchFiles(task.id);
                              setValues(task);
                              setShow3(true);
                            }}
                            style={{ color: "green", fontSize: 30 }}
                          ></i>
                        </div>
                        <p className="text-muted mt-5">{task.description}</p>
                        <p className="text">
                          Created By:{" "}
                          <span className="bg-secondary-transparent text-secondary">
                            {task.created_by.names}
                          </span>
                        </p>
                        <p className="text">
                          Assigned users:{" "}
                          <span className="bg-secondary-transparent text-secondary">
                            {task.assignees.length > 0
                              ? task.assignees.map((el) => el.names).join(", ")
                              : "No assignee"}
                          </span>
                        </p>
                        <p className="text">
                          Projects:{" "}
                          {task.projects.length > 0
                            ? task.projects.map((el) => el.name).join(", ")
                            : "No project"}
                        </p>
                        <p className="text">
                          Timeline:{" "}
                          <span className="bg-primary-transparent text-primary">
                            {task.start_date} to {task.end_date}
                          </span>
                        </p>
                        <p className="text">Priority: {task.priority}</p>
                        <p className="text">
                          Status:{" "}
                          {!task.started && (
                            <span className="bg-danger-transparent text-danger">
                              Not started
                            </span>
                          )}
                          {task.started && !task.completed && (
                            <span className="bg-primary-transparent text-primary">
                              In Progress
                            </span>
                          )}
                          {task.started && task.completed && (
                            <span className="bg-success-transparent text-success">
                              Completed
                            </span>
                          )}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <p>No Task yet...</p>
            )}
          </Row>
        </Card.Body>
      </Card>

      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          reset();
        }}
      >
        <Form onSubmit={handleSubmit}>
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
                          <Form.Label>Task Name</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="example-text-input"
                            placeholder="Task Name..."
                            onChange={(e) => setTask(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group>
                          <Form.Label>Start date</Form.Label>
                          <Form.Control
                            type="date"
                            className="form-control"
                            name="start-date-input"
                            placeholder="Start date.."
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group>
                          <Form.Label>End date</Form.Label>
                          <Form.Control
                            type="date"
                            className="form-control"
                            name="end-date-input"
                            placeholder="End date.."
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={12} style={{ marginTop: 15 }}>
                        <Form.Group className="form-group">
                          <Form.Label>Select Assignees</Form.Label>
                          <Select
                            isMulti
                            options={assignees}
                            onChange={(e) =>
                              setSelectedAssignees(e.map((emp) => emp.value))
                            }
                            classNamePrefix="Select2"
                            className="multi-select"
                            placeholder="Select them"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={12} style={{ marginTop: 15 }}>
                        <Form.Group className="form-group">
                          <Form.Label>Select Projects</Form.Label>
                          <Select
                            isMulti
                            options={projects}
                            onChange={(e) =>
                              setSelectedProjects(e.map((pr) => pr.value))
                            }
                            classNamePrefix="Select2"
                            className="multi-select"
                            placeholder="Select them"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={12} style={{ marginTop: 15 }}>
                        <Form.Group className="form-group">
                          <Form.Label>Description</Form.Label>
                          <textarea
                            className={
                              description.length > 49 && isFocused
                                ? "form-control is-invalid state-invalid"
                                : "form-control"
                            }
                            name="description"
                            placeholder="Description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            required
                            maxLength={50}
                          ></textarea>
                          {description.length > 49 && isFocused && (
                            <div className="invalid-feedback">
                              Max length 50
                            </div>
                          )}
                        </Form.Group>
                      </Col>

                      <Col lg={12}>
                        <Form.Group className="form-group form-elements">
                          <div className="form-label">Priority</div>
                          <div className="custom-controls-stacked">
                            <Row>
                              <Col lg={2}>
                                <Form.Check
                                  type="radio"
                                  onChange={(e) => setPriority(e.target.value)}
                                  checked={priority === "Low"}
                                  name="priority"
                                  label="Low"
                                  value="Low"
                                  required
                                />
                              </Col>
                              <Col lg={2}>
                                <Form.Check
                                  type="radio"
                                  onChange={(e) => setPriority(e.target.value)}
                                  checked={priority === "Normal"}
                                  name="priority"
                                  label="Normal"
                                  value="Normal"
                                  required
                                />
                              </Col>
                              <Col lg={2}>
                                <Form.Check
                                  type="radio"
                                  onChange={(e) => setPriority(e.target.value)}
                                  checked={priority === "High"}
                                  name="priority"
                                  label="High"
                                  value="High"
                                  required
                                />
                              </Col>
                            </Row>
                          </div>
                        </Form.Group>
                      </Col>

                      <Col lg={12} style={{ marginTop: 15 }}>
                        <Form.Group className="form-group">
                          <Form.Label>
                            Choose files (You can choose multiple at the same
                            time).
                          </Form.Label>
                          <Form.Control
                            type="file"
                            multiple
                            className="border-right-0 browse-file"
                            placeholder="Upload file"
                            onChange={(e) => setFiles(e.target.files)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      className="btn ripple btn-primary my-3"
                    >
                      Submit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Modal.Body>
        </Form>
      </Modal>

      <Modal
        show={show2}
        onHide={() => {
          setShow2(false);
          reset();
        }}
      >
        <Form onSubmit={handleSubmit2}>
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
                          <Form.Label>Task Name</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="example-text-input"
                            placeholder="Task Name..."
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group>
                          <Form.Label>Start date</Form.Label>
                          <Form.Control
                            type="date"
                            className="form-control"
                            name="start-date-input"
                            placeholder="Start date.."
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group>
                          <Form.Label>End date</Form.Label>
                          <Form.Control
                            type="date"
                            className="form-control"
                            name="end-date-input"
                            placeholder="End date.."
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={12} style={{ marginTop: 15 }}>
                        <Form.Group className="form-group">
                          <Form.Label>Select Assignees</Form.Label>
                          <Select
                            isMulti
                            options={assignees}
                            defaultValue={selectedAssignees.map((assignee) => {
                              return {
                                value: assignee.id,
                                label: assignee.email,
                              };
                            })}
                            onChange={(e) =>
                              setSelectedAssignees(e.map((emp) => emp.value))
                            }
                            classNamePrefix="Select2"
                            className="multi-select"
                            placeholder="Select them"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={12} style={{ marginTop: 15 }}>
                        <Form.Group className="form-group">
                          <Form.Label>Select Projects</Form.Label>
                          <Select
                            isMulti
                            defaultValue={selectedProjects.map((project) => {
                              return {
                                value: project.id,
                                label: project.name,
                              };
                            })}
                            options={projects}
                            onChange={(e) =>
                              setSelectedProjects(e.map((pr) => pr.value))
                            }
                            classNamePrefix="Select2"
                            className="multi-select"
                            placeholder="Select them"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={12} style={{ marginTop: 15 }}>
                        <Form.Group className="form-group">
                          <Form.Label>Description</Form.Label>
                          <textarea
                            className={
                              description.length > 49 && isFocused
                                ? "form-control is-invalid state-invalid"
                                : "form-control"
                            }
                            name="description"
                            placeholder="Description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            required
                            maxLength={50}
                          ></textarea>
                          {description.length > 49 && isFocused && (
                            <div className="invalid-feedback">
                              Max length 50
                            </div>
                          )}
                        </Form.Group>
                      </Col>

                      <Col lg={12}>
                        <Form.Group className="form-group form-elements">
                          <div className="form-label">Priority</div>
                          <div className="custom-controls-stacked">
                            <Row>
                              <Col lg={2}>
                                <Form.Check
                                  type="radio"
                                  onChange={(e) => setPriority(e.target.value)}
                                  checked={priority === "Low"}
                                  name="priority"
                                  label="Low"
                                  value="Low"
                                  required
                                />
                              </Col>
                              <Col lg={2}>
                                <Form.Check
                                  type="radio"
                                  onChange={(e) => setPriority(e.target.value)}
                                  checked={priority === "Normal"}
                                  name="priority"
                                  label="Normal"
                                  value="Normal"
                                  required
                                />
                              </Col>
                              <Col lg={2}>
                                <Form.Check
                                  type="radio"
                                  onChange={(e) => setPriority(e.target.value)}
                                  checked={priority === "High"}
                                  name="priority"
                                  label="High"
                                  value="High"
                                  required
                                />
                              </Col>
                            </Row>
                          </div>
                        </Form.Group>
                      </Col>

                      <Col lg={12}>
                        <Form.Group className="form-group form-elements">
                          <div className="form-label">Change task status</div>
                          <div className="custom-controls-stacked">
                            <Row>
                              <Col lg={2}>
                                <Form.Check
                                  type="radio"
                                  onChange={(e) => setStatus(e.target.value)}
                                  checked={status === "started"}
                                  name="status"
                                  label="started"
                                  value="started"
                                  required
                                />
                              </Col>
                              <Col lg={2}>
                                <Form.Check
                                  type="radio"
                                  onChange={(e) => setStatus(e.target.value)}
                                  checked={status === "completed"}
                                  name="status"
                                  label="completed"
                                  value="completed"
                                  required
                                />
                              </Col>
                            </Row>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      type="submit"
                      className="btn ripple btn-primary my-3"
                    >
                      Submit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Modal.Body>
        </Form>
      </Modal>

      <Modal
        style={{ width: 600, left: "33%" }}
        center
        show={show3}
        onHide={() => {
          setShow3(false);
          reset();
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Col lg={12} className="col-md-">
            <Card className="card overflow-hidden" style={{ height: "100%" }}>
              <Card.Body>
                <h3>{task}</h3>
                <p className="text-muted mt-5">{task.description}</p>
                <p className="text">
                  Created By:{" "}
                  <span className="bg-secondary-transparent text-secondary">
                    {creator}
                  </span>
                </p>
                <p className="text">
                  Assigned users:{" "}
                  <span className="bg-secondary-transparent text-secondary">
                    {assignees.length > 0
                      ? task.assignees?.map((el) => el.names).join(", ")
                      : "No assignee"}
                  </span>
                </p>
                <p className="text">
                  Projects:{" "}
                  {projects.length > 0
                    ? task.projects?.map((el) => el.name).join(", ")
                    : "No project"}
                </p>
                <p className="text">
                  Timeline:{" "}
                  <span className="bg-primary-transparent text-primary">
                    {startDate} to {endDate}
                  </span>
                </p>
                <p className="text">Priority: {task.priority}</p>
                <p className="text">
                  Status:{" "}
                  {!started && (
                    <span className="bg-danger-transparent text-danger">
                      Not started
                    </span>
                  )}
                  {started && !completed && (
                    <span className="bg-primary-transparent text-primary">
                      In Progress
                    </span>
                  )}
                  {started && completed && (
                    <span className="bg-success-transparent text-success">
                      Completed
                    </span>
                  )}
                </p>
              </Card.Body>
            </Card>
            <Row>
              {taskFiles.length > 0 ? (
                taskFiles.map((file, index) => (
                  <Col xl={6} lg={6} md={6} sm={6}>
                    <Card
                      className="card overflow-hidden"
                      style={{ height: 80 }}
                    >
                      <Card.Body>
                        <Row>
                          <div className="row mb-2" key={index}>
                            <div className="col-9">
                              <p className="mb-0 text-dark fw-semibold">
                                {file.name}
                              </p>
                            </div>
                            <div className="col-3 my-auto">
                              <span className="bg-primary-transparent avatar avatar-lg brround text-primary float-end">
                                <i
                                  className="fe fe-download"
                                  style={{ fontSize: 30 }}
                                  onClick={() =>
                                    handleDownload(file.file, file.type)
                                  }
                                ></i>
                              </span>
                            </div>
                          </div>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No files for the task...</p>
              )}
            </Row>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Taskboard;
