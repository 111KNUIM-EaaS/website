import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Nav, Navbar, Toast, Form, Button} from "react-bootstrap"
import { PlayBtn, PauseBtn, StopBtn, Hammer } from "react-bootstrap-icons";
import { authentication } from "../../../../compose/firebase";
import { onAuthStateChanged } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import './information.css';
import axios from 'axios';
import apiConf from '../../../../conf/apiConf.json'

const MachineInformation = () => {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState();
    const [showA, setShowA] = useState(false);
    const [rid, setRid] = useState(undefined);
    const [infoList , setInfoList] = useState([]);
    const toggleShowA = () => setShowA(!showA);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const value  = params.get('rid');
        setRid(value);

        onAuthStateChanged(authentication, (user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        if (user) {
            getMachineInfo();
        }
      }, [user]);
      
      
      
      
    const getMachineInfo = async() => {
        // header
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User': user.uid
        };

        // data
        const data = {
            rid: rid,
        }

        // axios
        axios
            .post(`http://${apiConf.host}:${apiConf.port}/api/machines/info`, data, { headers: headers })
             .then(res => {
                // console.log("🚀 ~ file: information.js:21 ~ useEffect ~ res data:", res.data);
                setInfoList(res.data);
             })
             .catch(err => {
                console.log("information.js getMachineInfo err:", err);
                window.location.href = "/home/state";
             });
    }

    const machineStatus = (status) => {
        console.log("status:", status, user.uid);

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User': user.uid
        };

        const data = {
            rid: rid,
            status: status
        };

        axios.post(`http://${apiConf.host}:${apiConf.port}/api/machines/update_status`, data, { headers: headers })
            .then(res => {
                console.log("🚀 ~ file: information.js:21 ~ useEffect ~ res data:", res);
                // window.location.href = "/home/state";
            })
            .catch(err => {
                console.log("information.js machineStatus err:", err);
                
            }
        );

        if (status === 1) {
            console.log("status: running");
        } else if (status === 3) {
            console.log("status: stop ");
        } else if (status === 0) {
            console.log("status: pause");
            window.location.href = "/home/state";
        }
    }

    const icon_list = [
        {icon: <PlayBtn size={30} className='success'/>, name: <span className='success'>運行</span>,function: () => machineStatus(1)},
        {icon: <PauseBtn size={30} className='danger'/>, name: <span className='danger'>暫停</span>, function: () => machineStatus(3)},
        {icon: <StopBtn  size={30} className='danger'/>, name: <span className='danger'>中止</span>, function: () => machineStatus(0)},
        {icon: <Hammer size={30} className='warning' />, name: <span className='warning'>設定</span>, function: toggleShowA},
    ]


    const handleSubmit = (event) => {
        document.getElementById("summit_button").disabled = true;

        const user_project = document.getElementById("user_project").value;
        const repo_value = document.getElementById("repo_value").value;
        const token_value = document.getElementById("token_value").value;

        const data = {
            rid: rid,
            user_project: user_project,
            repo: repo_value,
            token: token_value
        };

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User': user.uid,
        };
        // console.log("🚀 ~ file: information.js:21 ~ useEffect ~ res data:", data);
        
        axios.post(`http://${apiConf.host}:${apiConf.port}/api/machines/update_info`, data, { headers: headers })
            .then(res => {
                console.log("🚀 ~ file: information.js:21 ~ useEffect ~ res data:", res);
                window.location.href = "/home/state";
            })
            .catch(err => {
                console.log("information.js getMachineInfo err:", err);
                
            });
        window.location.reload();
    };
    // console.log("🚀 ~ file: information.js:21 ~ useEffect ~ res data:", infoList)
    return (
        <Container fluid style={{ position: 'relative', height: "95vh" }}>
            <Row className="pt-4" style={{ height: "15vh"}} >
                <Col>
                    <Navbar>
                        <Navbar.Brand style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{infoList.project_name} (status:)</Navbar.Brand>
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
            <Row className='text-center'>
                <Col>
                    <Card style={{ height: "75vh"}} >
                        <Row className='pt-4'>
                            <Col  md={3}>
                                <div className='fs-4'>
                                    <p className='pb-3'>GitHub Info</p>
                                    <p className='pb-3'>專案名稱: {infoList.project_name}</p>
                                    {/* <p className='pb-3'>使用者: {infoList.github.owner}</p> */}
                                    {/* <p className='pb-3'>repo: {infoList.github.repo}</p> */}
                                </div>
                            </Col>
                            <Col  md={9}>
                                <div className='fs-4'>
                                    <p className='pb-3'>Machine Info: </p>
                                    {/* <p className='pb-3'>類型: {infoList.machine.type}</p>
                                    <p className='pb-3'>每秒價格{infoList.machine.price}</p>
                                    <p className='pb-3'>狀態: {infoList.machine.status}</p> */}
                                    <p className='pb-3'>租借時間: {infoList.time}</p>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Toast show={showA} onClose={toggleShowA} className="position-absolute top-50 start-50 translate-middle" style={{  width:"60vw", maxWidth: "90vw", zIndex: "4" }}>
                <Toast.Header>
                    <strong className="me-auto">GitHub資訊更改</strong>
                </Toast.Header>
                <Form noValidate validated={validated} className= "bg-light">
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
                     <Button type="button" id="summit_button" onClick={() => handleSubmit()} className='mb-3 ms-4'>儲存並送出</Button>
                </Form>
            </Toast>
        </Container>
    );
}
export default MachineInformation;