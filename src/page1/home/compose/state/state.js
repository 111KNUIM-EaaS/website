import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationComponent from "../../../../compose/pagination";
import axios from "axios";

const State = () => {
    const [returnTime, setReturnTime ] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [machineList, setMachineList] = useState([]);
    const itemsPerPage = 3;
    
    useEffect(() => {
        axios
        .get('http://localhost:8000/api/machines/state')
        .then(res => {
            console.table("🚀 ~ file: machine.js:13 ~ useEffect ~ res data:", res.data.data);
            setMachineList(res.data.data);
        })
        .catch(err => {
            console.log("🚀 ~ file: machine.js:21 ~ useEffect ~ err:", err)
        });
    }, []);

    console.table(machineList);
    
    const totalPages = Math.ceil(machineList.length / itemsPerPage);
    
    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = machineList.slice(startIndex, endIndex);

    const returnMachine = (index) => {
        const now = new Date();
        setReturnTime(now);
        console.log("🚀 ~ file: state.js:13 ~ returnMachine ~ now:", now);
        
        axios
        .post("http://localhost:8000/api/machines/return_time", { returnTime: now })
        .then(res => {
            console.log("🚀 ~ file: state.js:13 ~ returnMachine ~ res:", res);
        })
        .catch(err => {
            console.log("🚀 ~ file: state.js:13 ~ returnMachine ~ err:", err);
        })

        const newItems = [...currentItems];
        newItems.splice(index - startIndex, 1);
        machineList.splice(startIndex, currentItems.length, ...newItems);
    }

    return (
        <Container fluid>
            {machineList.map((state, index) => ( 
                <Row className="mt-5 pt-5 mx-3" key={index}>
                    <Col>
                        <Card className="fs-2">
                            <Card.Header>
                                machine{state.machines_id}
                            </Card.Header>
                            <Card.Body>
                                <div>種類：{state.type_name}</div>
                                <div>電量：{state.machines_power}</div>
                                <Button onClick={() => returnMachine(startIndex + index)} data-index={index}>停止</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
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
