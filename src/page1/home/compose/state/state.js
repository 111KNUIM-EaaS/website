import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Card} from "react-bootstrap";
import { authentication } from "../../../../compose/firebase";
import { onAuthStateChanged } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationComponent from "../../../../compose/pagination";
import axios from "axios";
import apiConf from '../../../../conf/apiConf.json'

const State = () => {
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [machineList, setMachineList] = useState([]);
    const itemsPerPage = 3;

    const getMachineList = useCallback((uid) => {
        axios.post(`${apiConf.URL || "" }/api/machines/state`, { uid: uid })
            .then(res => {
                // console.table("🚀 ~ file: state.js: 23 ~ useEffect ~ res data:", res.data.data);
                setMachineList(res.data.data);
            })
            .catch(err => {
                console.log("🚀 ~ file: state.js:21 ~ useEffect ~ err:", err)
            });
    }, []);
    
    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            // console.log("🚀 ~ file: state.js:16 ~ onAuthStateChanged ~ user:", user);
            setUser(user);
            // console.log("🚀 ~ file: state.js:19 ~ onAuthStateChanged ~ user.uid:", user.uid);
            getMachineList(user.uid);
        });
    }, [user, getMachineList]);
    
    const totalPages = Math.ceil(machineList.length / itemsPerPage);
    
    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = machineList.slice(startIndex, endIndex);

    const returnMachine = (rid) => {
        window.location.href = "/home/machine/information/?rid=" + rid;
    }

    const delMachine = (rid) => {
        console.log("🚀 ~ file: state.js:66 ~ delMachine ~ rid:", rid);
        if (user !== null) {
            user.getIdToken().then((idToken) => {
                const data = {  // data to send to backend
                    rid: rid
                };
                
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'User': user.uid,
                    'Authorization': idToken
                };

                axios.post(`${apiConf.URL || "" }/api/machines/delete`, data, { headers: headers })
                    .then(res => {
                        // console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ res:", res);
                        getMachineList(user.uid);
                    })
                    .catch(err => {
                        console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ err:", err);
                        window.location.reload();
                    });
            });
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col></Col>
                <Col>
                    <Button size="lg" variant="outline-secondary" className="d-flex justify-content-center mt-4" href="/home/machine">新增機器</Button>
                </Col>
                <Col></Col>
            </Row>
            {machineList.length >= 1 ? (
                currentItems.map((state, index) => ( 
                    <Row className="mt-3 pt-3 mx-3" key={index}>
                        <Col>
                            <Card className="fs-2">
                                <Card.Header>
                                    {state.project_name}
                                </Card.Header>
                                <Card.Body>
                                    <div>種類：{state.machine.type}</div>
                                    <div>狀態：{(state.machine.status === 0)? "離線" : (state.machine.status === 1)? "啟動" : (state.machine.status === 2)? "運行中" : (state.machine.status === 3)? "暫停中" : (state.machine.status === 4)? "暫停" : (state.machine.status === 5)? "更新中" : "閒置" }</div>
                                    <div>價格：{state.machine.price * 60 * 60} 元/小時</div>
                                    <div>Github: <a href={`https://github.com/${state.github.owner}/${state.github.repo}`}>{state.github.owner}/{state.github.repo}</a></div>
                                    <hr />
                                    <Row className="mb-1">
                                        <Col>
                                            <div className="d-grid gap-2">
                                                <Button variant="outline-info" size="lg" onClick={() => returnMachine(state.id)} data-index={index}>查看更多</Button>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="d-grid gap-2">
                                                <Button variant="outline-danger" size="lg" onClick={() => {delMachine(state.id)}} data-index={index}>刪除機器</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                
                            </Card>
                        </Col>
                    </Row>
            )) 
            ) : (
                <div className="fs-2 text-center">
                    <p className="mt-3 pt-2">尚未新增機器</p>
                    {/* <a href="/home/machine">新增機器</a> */}
                </div>
            )}
            <Row className="justify-content-center mt-3 pt-5">
                <Col md={4} className="d-flex justify-content-center">
                    <PaginationComponent 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default State
