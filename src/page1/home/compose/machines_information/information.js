import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Container, Row, Col, Nav, Navbar, Toast, Form, Button, DropdownButton, ButtonGroup, Dropdown, ListGroup} from "react-bootstrap"
import { PlayBtn, PauseBtn, StopBtn, Hammer, Tag, FileEarmarkMedical } from "react-bootstrap-icons";
import { authentication } from "../../../../compose/firebase";
import { onAuthStateChanged } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import './information.css';
import axios from 'axios';
import apiConf from '../../../../conf/apiConf.json'

const MachineInformation = () => {
    const [rid,                setRid               ] = useState(undefined);
    const [user,               setUser              ] = useState(null);
    const [showA,              setShowA             ] = useState(false);
    const [validated,          setValidated         ] = useState(false);
    const [machineInfo,        setMachineInfo       ] = useState(undefined);
    const [gitHubOTAData,      setGitHubOTAData     ] = useState(undefined);
    const [githubReleasesList, setGithubReleasesList] = useState([]);

    const toggleShowA = () => setShowA(!showA);
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const value  = params.get('rid');
        setRid(value);

        onAuthStateChanged(authentication, (user) => {
            setUser(user);
            getMachineInfo();
        });
    }, [user]);

    const getMachineInfo = () => {
        // header
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User': user.uid,
        };

        // data
        const data = {
            rid: rid,
        }

        // axios
        axios.post(`http://${apiConf.host}:${apiConf.port}/api/machines/info`, data, { headers: headers })
             .then(res => {
                const data = res.data;
                console.log("🚀 ~ file: information.js:51 ~ getMachineInfo ~ data:", data)
                setMachineInfo(data)
                getGitHubOTAData(data.github.owner, data.github.repo);
             })
             .catch(err => {
                console.log("information.js getMachineInfo err:", err);
                // window.location.href = "/home/state";
             });
    }

    const getGitHubOTAData = async (owner, repo) => {
        try {
            const response = 
                await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/vnd.github+json'
                    },
                });

            const data = await response.json();
            console.log("gitHubOTAData:", data);
            setGithubReleasesList(data);
            setGitHubOTAData(data[0]);
        }
        catch (error) {
            console.log(`[https://api.github.com/repos/${owner}/${repo}/releases]error:`, error);
        }
    }

    const icon_list = [
        {icon: <PlayBtn size={30} className='success'/>, name: <span className='success'>運行</span>, function: () => {console.log("play")}},
        {icon: <PauseBtn size={30} className='danger'/>, name: <span className='danger'>暫停</span>, function: () => {console.log("stop")}},
        {icon: <StopBtn  size={30} className='danger'/>, name: <span className='danger'>中止</span>, function: () => {console.log("window")}},
        {icon: <Hammer size={30} className='warning' />, name: <span className='warning'>設定</span>, function: toggleShowA},
    ]

    const handleSubmit = (event) => {
        // const repo_value = document.getElementById("repo_value").value;
        // console.log("🚀 ~ file: information.js:22 ~ handleSubmit ~ repo_value:", repo_value)
        
        event.preventDefault();
        const form = event.currentTarget;
        const formIsValid = form.checkValidity();
        if (formIsValid) {
            event.stopPropagation();
            console.log(formIsValid);
        } else {
            setValidated(false);
            toggleShowA();
        }
        setValidated(true);
    };

    const handleSelect = (eventKey) => {
        console.log('Selected event key:', eventKey);
        setGitHubOTAData(githubReleasesList.find(releases => releases.tag_name === eventKey))
    };

    function handleButtonClick(type, file) {
        // header
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User': user.uid,
        };

        // data
        const data = {
            rid: rid,
            firmware: {
                name: file.name,
                url: file.browser_download_url,
                tag: gitHubOTAData.tag_name,
            }
        }

        // axios
        axios.post(`http://${apiConf.host}:${apiConf.port}/api/machines/ota`, data, { headers: headers })
             .then(res => {
                console.log("information.js getMachineInfo res:", res.data);

             })
             .catch(err => {
                console.log("information.js getMachineInfo err:", err);
                // window.location.reload();
             });
    }

    return (
        <Container fluid style={{ position: 'relative', height: "95vh" }}>
            <Row className="pt-4" style={{ height: "15vh"}} >
                <Col>
                    <Navbar>
                        <Navbar.Brand style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Project Name (status: 運行)</Navbar.Brand>
                        <Nav className="ms-auto">
                            {icon_list.map((icon, index) => (
                                <Nav.Link key={index} onClick={icon.function}>
                                    <div className="icons"><span className='d-none d-lg-block'>{icon.name}</span> {icon.icon}</div>
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
            <Row style={{ height: "80vh"}}>
                <Col>
                    <Card>
                        <Container>
                            <Row xs={1} md={1} className="align-items-center" style={{height: '85vh'}} >
                                <Col>
                                    <Card style={{height: '80vh'}} >
                                        <Card.Header>
                                            <Row>
                                                <Col>
                                                    <h2>{gitHubOTAData === undefined? "OTA 雲端更新" : gitHubOTAData.name}</h2>
                                                </Col>
                                                <Col style={{textAlign: 'right'}}>
                                                    <DropdownButton as={ButtonGroup} title={gitHubOTAData === undefined? "Tag" :gitHubOTAData.tag_name} onSelect={handleSelect}>
                                                        {
                                                            githubReleasesList.map(releases => {
                                                                
                                                                return (
                                                                    <Dropdown.Item key={releases.tag_name} eventKey={releases.tag_name}>{releases.tag_name}</Dropdown.Item>
                                                                )
                                                            })
                                                        }
                                                    </DropdownButton>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <img
                                                        src={gitHubOTAData === undefined? "" : `https://github.com/${gitHubOTAData.author.login}.png`}
                                                        height="20"
                                                        className="d-inline-block rounded-circle"
                                                        alt={gitHubOTAData === undefined? "" : gitHubOTAData.author.login}
                                                    />
                                                    {gitHubOTAData === undefined? "" : ` ${gitHubOTAData.author.login}`} released this 
                                                    {gitHubOTAData === undefined? "" : " " + (new Date(gitHubOTAData.published_at)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </Col>
                                                <Col>
                                                    <Tag size={20} /> {gitHubOTAData === undefined? "" : gitHubOTAData.tag_name} 
                                                </Col>
                                            </Row>
                                        </Card.Header>

                                        <Card.Body>
                                            <ReactMarkdown>{gitHubOTAData === undefined? "" : gitHubOTAData.body}</ReactMarkdown>
                                        </Card.Body>

                                        <Card.Footer>
                                            <Card>
                                                <Card.Header>
                                                    Assets
                                                </Card.Header>
                                                <Card.Body>
                                                    <ListGroup className="list-group-flush">
                                                        {
                                                            gitHubOTAData === undefined? ('No Assets') : gitHubOTAData.assets.map((file) => {
                                                                if(!(/\.bin$/.test(file.name))) {
                                                                    return null;
                                                                }
                                                                return(
                                                                    <ListGroup.Item key={file.name}>
                                                                        <Row className='align-items-center'>
                                                                            <Col className='h3'>
                                                                                <a href={file.browser_download_url}><FileEarmarkMedical size={30}/>{file.name}</a>
                                                                            </Col>
                                                                            <Col>
                                                                                {(new Date(file.updated_at)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                                            </Col>
                                                                            <Col className="d-grid gap-2" style={{textAlign: "right"}}>
                                                                                {
                                                                                    file.name.toLowerCase().indexOf("spiffs") !== -1 ? (
                                                                                        <Button variant="outline-warning" size="lg" onClick={() => handleButtonClick("spiffs", file)}>
                                                                                            燒入 {file.name}
                                                                                        </Button>
                                                                                    ) : file.name.toLowerCase().indexOf("firmware") !== -1 ? (
                                                                                        <Button variant="outline-danger" size="lg" onClick={() => handleButtonClick("firmware", file)}>
                                                                                            燒入 {file.name}
                                                                                        </Button>
                                                                                    ) : (
                                                                                        <ButtonGroup size="lg">
                                                                                            <Button variant="outline-primary" onClick={() => handleButtonClick("firmware", file)}>Firmware</Button>
                                                                                            <Button variant="outline-primary" onClick={() => handleButtonClick("spiffs", file)}>SPIFFS</Button>
                                                                                        </ButtonGroup>
                                                                                    )
                                                                                }
                                                                            </Col>
                                                                        </Row>
                                                                    </ListGroup.Item>
                                                                );
                                                            })
                                                        }
                                                    </ListGroup>
                                                </Card.Body>
                                            </Card>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                </Col>
            </Row>
            <Toast show={showA} onClose={toggleShowA} className="position-absolute top-50 start-50 translate-middle" style={{  width:"60vw", maxWidth: "90vw", zIndex: "4" }}>
                <Toast.Header>
                    <strong className="me-auto">GitHub資訊更改</strong>
                </Toast.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group as={Row} className="mb-1 p-4" controlId="user_project">
                        <Form.Label column sm="1">
                            user_name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" placeholder="請輸入專案名稱"/>
                            <Form.Control.Feedback type="invalid">user_project is a required field</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1 p-4" controlId="repo_value">
                        <Form.Label column sm="1">
                            repo
                        </Form.Label>
                        <Col sm="10" type="invalid">
                            <Form.Control required type="text" placeholder="請輸入GitHubRepo"/>
                            <Form.Control.Feedback type="invalid">repo is a required field</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1 p-4" controlId="token_value">
                        <Form.Label column sm="1">
                            Token
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" placeholder="請輸入GitHubToken"/>
                            <Form.Control.Feedback type="invalid">token is a required field</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                        className='m-3'
                    />
                    <Button type="button" onClick={handleSubmit} className='mb-3 ms-4'>儲存並送出</Button>
                </Form>
            </Toast>
        </Container>
    );
}
export default MachineInformation;