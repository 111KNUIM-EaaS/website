import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card} from "react-bootstrap";
import { authentication } from "../../../../compose/firebase";
import { onAuthStateChanged } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationComponent from "../../../../compose/pagination";
import axios from "axios";
import apiConf from '../../../../conf/apiConf.json'

const State = () => {
    const [user, setUser] = useState(null);
    const [returnTime, setReturnTime ] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [machineList, setMachineList] = useState([]);
    const itemsPerPage = 3;
    
    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            console.log("🚀 ~ file: state.js:16 ~ onAuthStateChanged ~ user:", user);
            setUser(user);
            console.log("🚀 ~ file: state.js:19 ~ onAuthStateChanged ~ user.uid:", user.uid);
            getMachineList();
        });
    }, [user]);
    
    const totalPages = Math.ceil(machineList.length / itemsPerPage);
    
    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = machineList.slice(startIndex, endIndex);

    const getMachineList = () => {
        axios
        .post(`http://${apiConf.host}:${apiConf.port}/api/machines/state`, { uid: user.uid })
        .then(res => {
            console.table("🚀 ~ file: state.js: 23 ~ useEffect ~ res data:", res.data.data);
            setMachineList(res.data.data);
        })
        .catch(err => {
            console.log("🚀 ~ file: state.js:21 ~ useEffect ~ err:", err)
        });
    }

    const returnMachine = (machines_id, index) => {
        const now = new Date();
        setReturnTime(now);
        console.log("🚀 ~ file: state.js:49 ~ returnMachine ~ now:", now);
        console.log("🚀 ~ file: state.js:50 ~ returnMachine ~ machines_id:", machines_id);
        axios
        .post(`http://${apiConf.host}:${apiConf.port}/api/machines/return_time`, { returnTime: now, machineID: machines_id, uid: user.uid})
        .then(res => {
            console.log("🚀 ~ file: state.js:54 ~ returnMachine ~ res:", res);
        })
        .catch(err => {
            console.log("🚀 ~ file: state.js:57 ~ returnMachine ~ err:", err);
        })
        console.log("58", machineList);
        const newItems = [...currentItems];
        newItems.splice(index - startIndex, 1);
        machineList.splice(startIndex, currentItems.length, ...newItems);
        window.location.href = "/home/machine/information";
    }

    const delMachine = (rid) => {
        console.log("🚀 ~ file: state.js:66 ~ delMachine ~ rid:", rid);
        const data = {  // data to send to backend
            rid: rid
        };
        // console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ data:", data);
        
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User': user.uid,
        };
        // console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ headers:", headers);

        axios.post(`http://${apiConf.host}:${apiConf.port}/api/machines/delete`, data, { headers: headers })
             .then(res => {
                console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ res:", res);
                getMachineList();
             })
             .catch(err => {
                console.log("🚀 ~ file: machine.js:30 ~ handleBorrowTime ~ err:", err);
                window.location.reload();
             });
    }

    return (
        <Container fluid>
            {machineList.length >= 1 ? (
                currentItems.map((state, index) => ( 
                    <Row className="mt-5 pt-5 mx-3" key={index}>
                        <Col>
                            <Card className="fs-2">
                                <Card.Header>
                                    {state.project_name}
                                </Card.Header>
                                <Card.Body>
                                    <div>種類：{state.machine.type}</div>
                                    <div>狀態：{(state.machine.status === 0)? "離線" : (state.machine.status === 1)? "啟動中" : (state.machine.status === 2)? "啟動" : (state.machine.status === 3)? "暫停中" : (state.machine.status === 4)? "暫停" : "" }</div>
                                    <div>價格：{state.machine.price} 元/小時</div>
                                    <div>Github: <a>{state.github.owner}/{state.github.repo}</a></div>
                                    <Button onClick={() => returnMachine(state.machines_id, startIndex + index)} data-index={index}>查看更多</Button>
                                    <Button variant="outline-danger" onClick={() => {delMachine(state.id)}} data-index={index}>刪除機器</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
            )) 
            ) : (
                <div className="fs-2 text-center">
                    <p className="mt-3 pt-2">尚未新增機器</p>
                    <a href="/home/machine">新增機器</a>
                </div>
            )}
            <Row className="justify-content-center mt-5 pt-5">
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
