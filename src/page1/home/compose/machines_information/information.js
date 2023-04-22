import React, { useState } from 'react';
import { Card, Container, Row, Col, Nav, Navbar, Toast, Form, Button} from "react-bootstrap"
import { PlayBtn, PauseBtn, StopBtn, Hammer } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import './information.css';

const MachineInformation = () => {
    const [validated, setValidated] = useState(false);
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

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
                        this is Content
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