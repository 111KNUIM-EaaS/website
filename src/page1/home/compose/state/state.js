import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card} from "react-bootstrap";
import { authentication } from "../../../../compose/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationComponent from "../../../../compose/pagination";
import axios from "axios";

const State = () => {
    const [user, setUser] = useState(null);
    const [returnTime, setReturnTime ] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [machineList, setMachineList] = useState([]);
    const itemsPerPage = 3;
    
    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            console.log("🚀 ~ file: header.js:16 ~ onAuthStateChanged ~ user:", user);
            setUser(user);
            console.log("🚀 ~ file: header.js:19 ~ onAuthStateChanged ~ user.uid:", user.uid);
            axios
                .post('http://localhost:8000/api/machines/state', { uid: user.uid })
                .then(res => {
                    console.table("🚀 ~ file: machine.js: 23 ~ useEffect ~ res data:", res.data.data);
                    setMachineList(res.data.data);
                })
                .catch(err => {
                    console.log("🚀 ~ file: machine.js:21 ~ useEffect ~ err:", err)
                });
                });
    }, [user]);
    
    const totalPages = Math.ceil(machineList.length / itemsPerPage);
    
    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = machineList.slice(startIndex, endIndex);

    const returnMachine = (machines_id, index) => {
        const now = new Date();
        setReturnTime(now);
        console.log("🚀 ~ file: state.js:49 ~ returnMachine ~ now:", now);
        console.log("🚀 ~ file: state.js:50 ~ returnMachine ~ machines_id:", machines_id);
        axios
        .post("http://localhost:8000/api/machines/return_time", { returnTime: now, machineID: machines_id, uid: user.uid})
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
    }

    return (
        <Container fluid>
            {machineList.length >= 1 ? (
                currentItems.map((state, index) => ( 
                    <Row className="mt-5 pt-5 mx-3" key={index}>
                        <Col>
                            <Card className="fs-2">
                                <Card.Header>
                                    machine{state.machines_id}
                                </Card.Header>
                                <Card.Body>
                                    <div>種類：{state.type_name}</div>
                                    <div>電量：{state.machines_power}</div>
                                    <Button onClick={() => returnMachine(state.machines_id, startIndex + index)} data-index={index}>停止</Button>
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
