import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Toast, Form } from "react-bootstrap";
import { authentication } from "../../../../compose/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import apiConf from '../../../../conf/apiConf.json' 

const imgList = [
    {id: 1, src: "/images/PCB_machine.png", height: 300, width: 300},
    {id: 2, src: "/images/3D_machine.png",  height: 300, width: 300},
    {id: 3, src: "/images/AGV.png",         height: 300, width: 300}
];

const Machine = () => {
    const [user,            setUser             ] = useState(null);
    const [showA,           setShowA            ] = useState(false);
    const [typeID,          setTypeID           ] = useState(0);
    const [machineTypeList, setMachineTypeList  ] = useState(undefined);

    // Get machine list
    const getMachineList = useCallback(() => {
        axios.get(`http://${apiConf.host}:${apiConf.port}/api/machines/list`)
            .then(res => {
                setMachineTypeList(res.data.data);
                // if(machineTypeList === undefined) {
                //     setMachineTypeList(res.data.data);
                // } else if(!areArraysEqual(machineTypeList, res.data.data)) {
                //     setMachineTypeList(res.data.data);
                // }
            })
            .catch(err => {
                console.log("🚀 ~ file: machine.js:21 ~ useEffect ~ err:", err)
            });
    }, []);

    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            // console.log("🚀 ~ file: header.js:15 ~ onAuthStateChanged ~ user:", user)
            setUser(user);
            getMachineList();
            // console.log("🚀 ~ file: header.js:15 ~ onAuthStateChanged ~ user.uid:", user.uid)
        });
    }, [getMachineList]);

    const toggleShowA = (id) => {
        // set the window to the top of the page
        window.scrollTo(0, 0);

        // console.log("🚀 ~ file: machine.js:14 ~ toggleShowA ~ id:", id)
        setTypeID(id);
        setShowA(!showA);
    };

    // Compare two arrays
    const areArraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) {
            return false;
        }

        return arr1.every((val, index) => val === arr2[index]);
    };

    const handleSubmit = (event) => {
        // Get user information
        let user_project      = document.getElementById("user_project").value.replace(/\s/g, "");
        let user_name_value   = document.getElementById("user_name"   ).value.replace(/\s/g, "");
        let repo_value        = document.getElementById("repo_value"  ).value.replace(/\s/g, "");
        let token_value       = document.getElementById("token_value" ).value.replace(/\s/g, "");

        document.getElementById('feedback_name' ).style.display = 'none';
        document.getElementById('feedback_owner').style.display = 'none';
        document.getElementById('feedback_repo' ).style.display = 'none';

        document.getElementById("summit_button").disabled = true;

        if(user_project.length <= 0 || user_name_value.length <= 0 || repo_value.length <= 0) {
            if(user_project.length <= 0) {
                document.getElementById('feedback_name').style.display = 'block';
            }
            
            if(user_name_value.length <= 0) {
                document.getElementById('feedback_owner').style.display = 'block';
            }

            if(repo_value.length <= 0) {
                document.getElementById('feedback_repo').style.display = 'block';
            }

            document.getElementById("summit_button").disabled = false;

        } else {
            if(token_value <= 0) {
                token_value = null;
            }

            const data = {  // data to send to backend
                type_id: typeID,
                user_project: user_project,
                user_name: user_name_value,
                repo: repo_value,
                token: token_value
            };
            // console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ data:", data);
            
            const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'User': user.uid,
            };
            console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ headers:", headers);

            axios.post(`http://${apiConf.host}:${apiConf.port}/api/machines/borrow_state`, data, { headers: headers })
                .then(res => {
                    console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ res:", res);
                    window.location.href = "/home/state";
                })
                .catch(err => {
                    console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ err:", err);
                    window.location.reload();
                });
        }
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
                                        <div className="py-2" style={{textAlign: 'center'}}><h1>{item.type_name}</h1></div>
                                        <div>{item.introduce}</div>
                                        <hr />
                                        <div className="py-2">每小時 ${item.price *60 *60}</div>
                                        <div className="py-2">
                                            <div className="d-grid gap-2">
                                                <Button size="lg" variant="outline-success" onClick={() => toggleShowA(item.machines_type)}>選擇</Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <Card className="h-100">
                                    <Card.Header className="p-3 rounded-4">
                                    <img key={index} src={imgList[index % imgList.length].src} alt="img" height= "300" style={{ opacity: "0.5" }} />
                                    </Card.Header>
                                    <Card.Body className="fs-5 text-start">
                                        <div className="py-2" style={{textAlign: 'center'}}><h1>{item.type_name}</h1></div>
                                        <div>{item.introduce}</div>
                                        <hr />
                                        <div className="py-2">每小時 ${item.price *60 *60}</div>
                                        <div className="py-2">
                                            <div className="d-grid gap-2">
                                                <Button size="lg" variant="outline-secondary" disabled>無法選擇</Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card> 
                            )
                        }                  
                    </Col>
                    ))
                ) : (
                    imgList.map((img, index) => (   
                        <Col key={index} className="m-5 p-4" style={{ border: "0", userSelect: "none" }}>
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
                    <strong className="me-auto fs-3">客製化機具產線參數</strong>
                </Toast.Header>
                <Form noValidate className= "bg-light">
                    <Form.Group as={Row} className="mb-1 p-4" controlId="user_project">
                        <Form.Label column sm="1" className="ps-2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" placeholder="請輸入專案名稱" className="ps-2"/>
                            <Form.Control.Feedback id="feedback_name" type="invalid">專案名稱不得空白</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1 p-4" controlId="user_name">
                        <Form.Label column sm="1" className="ps-2">
                            owner
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" placeholder="請輸入 GitHub 擁有者" className="ps-2"/>
                            <Form.Control.Feedback id="feedback_owner" type="invalid">GitHub 擁有者不得空白</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1 p-4" controlId="repo_value">
                        <Form.Label column sm="1" className="ps-2">
                            repo
                        </Form.Label>
                        <Col sm="10" type="invalid">
                            <Form.Control required type="text" placeholder="請輸入 GitHub Repo" className="ps-2"/>
                            <Form.Control.Feedback id="feedback_repo" type="invalid">GitHub Repo 不得空白</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1 p-4" controlId="token_value">
                        <Form.Label column sm="1">
                            Token
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" placeholder="請輸入 GitHub Token" className="ps-2" />
                            <Form.Control.Feedback type="invalid">Token 有誤</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Button type="button" size="lg" id="summit_button" onClick={() => handleSubmit()} className='mb-3 ms-4'>儲存並送出</Button>
                </Form>
            </Toast>
        </Container>   
    )
}

export default Machine;