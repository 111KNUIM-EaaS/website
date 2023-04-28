import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Container, Row, Col, Nav, Navbar, Toast, Form, Button, DropdownButton, ButtonGroup, Dropdown, ListGroup} from "react-bootstrap"
import { PlayBtn, PauseBtn, Trash, Hammer, Tag, FileEarmarkMedical } from "react-bootstrap-icons";
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
    const [bodyInfo,           setBodyInfo          ] = useState("");
    const [validated,          setValidated         ] = useState(false);
    const [machineInfo,        setMachineInfo       ] = useState(undefined);
    const [gitHubOTAData,      setGitHubOTAData     ] = useState(undefined);
    const [githubReleasesList, setGithubReleasesList] = useState([]);
    
    const toggleShowA = () => setShowA(!showA);
    
    useEffect(() => {
        setValidated(false);

        const params = new URLSearchParams(window.location.search);
        const value  = params.get('rid');
        setRid(value);

        onAuthStateChanged(authentication, (user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        if (user) {
            getMachineInfo(user.uid);
            // setInterval(() => {
            //     getMachineInfo(user.uid);
            // }, 5000);
        }
    }, [user]);

    const getMachineInfo = async(uid) => {
        // header
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User': uid
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

    const machineStatus = (status) => {
        // console.log("status:", status, user.uid);

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
                console.log("machineStatus data:", res.data);
                getMachineInfo(user.uid);
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
            const code = await response.status;
            if(code !== 200) {
                console.log("gitHubOTAData:", data);
                setBodyInfo("GitHub 取得資料失敗，請更新 owner(專案擁有者), repo(專案名稱), token(權限)")
            } else {
                console.log("gitHubOTAData:", data);
                setGithubReleasesList(data);
                setGitHubOTAData(data[0]);
            }
        }
        catch (error) {
            console.log(`[https://api.github.com/repos/${owner}/${repo}/releases]error:`, error);
            setBodyInfo("GitHub 取得資料失敗，請更新 owner(專案擁有者), repo(專案名稱), token(權限)")
        }
    }

    const icon_list = [
        {icon: <PlayBtn  size={30} className='success' />, name: <span className='success'>運行</span>,function: () => machineStatus(1)},
        {icon: <PauseBtn size={30} className='danger'  />, name: <span className='danger' >暫停</span>, function: () => machineStatus(3)},
        {icon: <Trash    size={30} className='danger'  />, name: <span className='danger' >刪除</span>, function: () => machineStatus(0)},
        {icon: <Hammer   size={30} className='warning' />, name: <span className='warning'>設定</span>, function: toggleShowA},
    ]


    const handleSubmit = (event) => {
        document.getElementById("summit_button").disabled = true;

        document.getElementById('feedback_owner').style.display = 'none';
        document.getElementById('feedback_repo' ).style.display = 'none';

        let owner_value = document.getElementById("owner").value;
        let repo_value  = document.getElementById("repo" ).value;
        let token_value = document.getElementById("token").value;

        if(owner_value.length <= 0 || repo_value.length <= 0) {
            if(owner_value.length <= 0) {
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

            const data = {
                rid: rid,
                owner: owner_value,
                repo:  repo_value,
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
                    console.log("information.js handleSubmit:", res);
                    getMachineInfo(user.uid);
                    toggleShowA();
                })
                .catch(err => {
                    console.log("information.js handleSubmit err:", err);
                });
        }
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
                console.log("information.js handleButtonClick res:", res.data);
                getMachineInfo(user.uid);
             })
             .catch(err => {
                console.log("information.js handleButtonClick err:", err);
                // window.location.reload();
             });
    }

    return (
        <Container fluid style={{ position: 'relative', height: "95vh" }}>
            <Row className="pt-2" style={{ height: "10vh"}} >
                <Col>
                    <Navbar>
                        <Navbar.Brand style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                            {(machineInfo)? machineInfo.project_name : ""} 機器狀態: { (machineInfo === undefined)?  "離線" : (machineInfo.machine.status === 1)? "運行中" : (machineInfo.machine.status === 2)? "運行" : (machineInfo.machine.status === 3)? "停止中" : (machineInfo.machine.status === 4)? "停止" : (machineInfo.machine.status === 5)? "更新中" : (machineInfo.machine.status === 6)? "更新完畢" : "未知錯誤" }
                        </Navbar.Brand>
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
            <Row>
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
                                                            gitHubOTAData === undefined? "" :
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
                                            {
                                                gitHubOTAData === undefined? <h2>{bodyInfo}</h2> : <ReactMarkdown>{gitHubOTAData.body}</ReactMarkdown>
                                            }
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
                    <strong className="me-auto fs-3">GitHub 資訊更改</strong>
                </Toast.Header>
                <Form noValidate className= "bg-light">
                    <Form.Group as={Row} className="mb-1 p-4" controlId="owner">
                        <Form.Label column sm="1" className="ps-2">
                            owner
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" placeholder="請輸入 GitHub 擁有者" className="ps-2"/>
                            <Form.Control.Feedback id="feedback_owner" type="invalid">GitHub 擁有者不得空白</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1 p-4" controlId="repo">
                        <Form.Label column sm="1" className="ps-2">
                            repo
                        </Form.Label>
                        <Col sm="10" type="invalid">
                            <Form.Control required type="text" placeholder="請輸入 GitHub Repo" className="ps-2"/>
                            <Form.Control.Feedback id="feedback_repo" type="invalid">GitHub Repo 不得空白</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1 p-4" controlId="token">
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
    );
}
export default MachineInformation;