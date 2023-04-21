import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Toast, Form } from "react-bootstrap";
import { authentication } from "../../../../compose/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import apiConf from '../../../../conf/apiConf.json' 

const Machine = () => {
    const [validated, setValidated] = useState(false);
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const [user, setUser] = useState(null);
    const [machineTypeList, setMachineTypeList] = useState(undefined);
    const [borrowTime, setBorrowTime] = useState([]);

    const imgList = [
        {id: 1, src: "/images/PCB.png", height: 300, width: 300},
        {id: 2, src: "/images/3D.png",  height: 300, width: 350},
        {id: 3, src: "/images/AGV.jpg", height: 300, width: 350}
    ]
    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            console.log("🚀 ~ file: header.js:15 ~ onAuthStateChanged ~ user:", user)
            setUser(user);
            console.log("🚀 ~ file: header.js:15 ~ onAuthStateChanged ~ user.uid:", user.uid)

        });
        axios
            .get(`http://${apiConf.host}:${apiConf.port}/api/machines/list`)
            .then(res => {
                console.table("🚀 ~ file: machine.js:13 ~ useEffect ~ res data:", res.data.data);
                setMachineTypeList(res.data.data);
            })
            .catch(err => {
                console.log("🚀 ~ file: machine.js:21 ~ useEffect ~ err:", err)
            });
    }, []);

    const handleSubmit = (event, type_id) => {
        const user_name_value = document.getElementById("user_name").value;
        const now = new Date();
        setBorrowTime(now);
        console.log("🚀 ~ file: information.js:22 ~ handleSubmit ~ user_name_value:", user_name_value)
        
        axios
            .post(`http://${apiConf.host}:${apiConf.port}/api/machines/borrow_state`, { borrowTime: now, uid: user.uid, type_id: type_id})
            .then(res => {
                console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ res:", res);
                
            })
            .catch(err => {
                console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ err:", err);
            });
        
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        toggleShowA();
        setValidated(true);
        window.location.href = "/home/state";
    };

    return (
        <Container fluid className="text-center"> 
            <Row className="h-100 align-items-center">
                {machineTypeList && machineTypeList.length > 0 ? (
                    machineTypeList.map((item, index) => (
                    <Col key={index} className="m-5 p-4" style={{ border: "0" }}>
                        
                            {
                                machineTypeList[index].count_same > 0 ? (
                                    <Card className="h-100">
                                        <Card.Header className="p-3 rounded-4">
                                        <img key={index} src={imgList[index % imgList.length].src} alt="img" height= "300" />
                                        </Card.Header>
                                        <Card.Body className="fs-5 text-start">
                                            <div className="py-2">{item.type_name}</div>
                                            <div>{item.introduce}</div>
                                            <div className="py-2">每小時${item.price *60 *60}</div>
                                            <div className="py-2">
                                                <Button onClick={toggleShowA}>選擇</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ) : (
                                    <Card className="h-100">
                                        <Card.Header className="p-3 rounded-4">
                                        <img key={index} src={imgList[index % imgList.length].src} alt="img" height= "300" style={{ opacity: "0.5" }} />
                                        </Card.Header>
                                        <Card.Body className="fs-5 text-start">
                                            <div className="py-2">{item.type_name}</div>
                                            <div>{item.introduce}</div>
                                            <div className="py-2">每小時${item.price *60 *60}</div>
                                            <div className="py-2">
                                                <Button disabled>無法選擇</Button>
                                            </div>
                                        </Card.Body>
                                    </Card> 
                                )
                            }
                            {/* <Button onClick={() => handleBorrowTime(item.type_id)}>選擇</Button> */}
                            {/* <Button onClick={toggleShowA}>選擇</Button> */}
                        
                    </Col>
                    ))
                ) : (
                    imgList.map((img, index) => (   
                        <Col className="m-5 p-4" style={{ border: "0", userSelect: "none" }}>
                            <Card className="h-100">
                                <Card.Header className="p-3 rounded-4" style={{  }}>
                                    <img key={index} src={img.src} alt="img" height={img.height} width={img.width} style={{ opacity: "0.5" }}/>
                                </Card.Header>
                                <Card.Body className="fs-5 text-start">
                                    <div className="py-2">...</div>
                                    <div>...</div>
                                    <div className="py-2">每小時$ ...</div>
                                    <div className="py-2">
                                        <Button disabled>選擇</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
            <Toast show={showA} onClose={toggleShowA} className="position-absolute top-50 start-50 translate-middle fs-5" style={{  width:"60vw", maxWidth: "90vw", zIndex: "4" }}>
                <Toast.Header className="bg-dark text-white">
                    <strong className="me-auto">GitHub資訊更改</strong>
                </Toast.Header>
                <Form noValidate validated={validated} className= "bg-light">
                    <Form.Group as={Row} className="mb-1 p-4" controlId="user_project">
                        <Form.Label column sm="1" className="ps-2">
                            project
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" placeholder="請輸入專案名稱" className="ps-2"/>
                            <Form.Control.Feedback type="invalid">user_project is a required field</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1 p-4" controlId="user_name">
                        <Form.Label column sm="1" className="ps-2">
                            userName
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" placeholder="請輸入使用者名稱" className="ps-2"/>
                            <Form.Control.Feedback type="invalid">user_name is a required field</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1 p-4" controlId="repo_value">
                        <Form.Label column sm="1" className="ps-2">
                            repo
                        </Form.Label>
                        <Col sm="10" type="invalid">
                            <Form.Control required type="text" placeholder="請輸入GitHubRepo" className="ps-2"/>
                            <Form.Control.Feedback type="invalid">repo is a required field</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1 p-4" controlId="token_value">
                        <Form.Label column sm="1">
                            Token
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" placeholder="請輸入GitHubToken" className="ps-2" />
                            <Form.Control.Feedback type="invalid">token is a required field</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                        className='m-3 text-start'
                    />
                    <Button type="button" onClick={() => handleSubmit()} className='mb-3 ms-4'>儲存並送出</Button>
                </Form>
            </Toast>
        </Container>   
    )
}

export default Machine;

    
    // const handleBorrowTime = (type_id) => {
    //     const now = new Date();
    //     setBorrowTime(now);
    //     console.log("🚀 ~ file: machine.js:25 ~ handleBorrowTime ~ now:", now);
    //     console.log(user);
    //     axios
    //         .post(`http://${apiConf.host}:${apiConf.port}/api/machines/borrow_state`, { borrowTime: now, uid: user.uid, type_id: type_id})
    //         .then(res => {
    //             console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ res:", res);
                
    //         })
    //         .catch(err => {
    //             console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ err:", err);
    //         });
    //     window.location.href = "/home/state";
    // }