import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-bootstrap-icons";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Machine = () => {
    const [machineTypeList, setMachineTypeList] = useState(undefined);
    const [borrowTime, setBorrowTime] = useState([]);

    const handleBorrowTime = () => {
        const now = new Date();
        setBorrowTime(now);
        console.log("🚀 ~ file: machine.js:13 ~ handleBorrowTime ~ now:", now);
        
        axios
            .post('http://localhost:8000/api/machines/borrow', { borrowTime: now })
            .then(res => {
                console.log("🚀 ~ file: machine.js:13 ~ handleBorrowTime ~ res:", res);
            })
            .catch(err => {
                console.log("🚀 ~ file: machine.js:13 ~ handleBorrowTime ~ err:", err);
            })
    }


    useEffect(() => {
        axios
            .get('http://localhost:8000/api/machines/list')
            .then(res => {
                console.table("🚀 ~ file: machine.js:13 ~ useEffect ~ res data:", res.data.data);
                setMachineTypeList(res.data.data);
            })
            .catch(err => {
                console.log("🚀 ~ file: machine.js:21 ~ useEffect ~ err:", err)
            });
    }, []);

    return (
        <Container fluid className="text-center"> 
            <Row className="h-100 align-items-center">
                {machineTypeList ? (
                    machineTypeList.map((item, index) => (
                    <Col key={index} className="m-5 p-4" style={{ border: "0" }}>
                        <Card className="h-100">
                            <Card.Header className="p-3 rounded-4" style={{ backgroundColor: "rgb(255, 255, 44"}}>
                                <Link size={300} />
                            </Card.Header>
                            <Card.Body className="fs-5 text-start">
                                <div className="py-2">{item.type_name}</div>
                                <div>是一種製造技術，
                                    可以將數字模型轉換成實體物體。
                                    它可以使用不同種類的材料，
                                    製造各種不同種類的產品，
                                    從玩具到機械零件到人體器官都可以製造。
                                    可以節省時間和成本，
                                    實現創意和設計的想法，
                                    廣泛應用於製造、
                                    醫學、建築、教育等領域。
                                </div>
                                <div className="py-2">{`$${item.price}`}</div>
                                <div className="py-2">
                                    <Button onClick={handleBorrowTime}>選擇</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))
                ) : (
                    <div>無資料</div>
                )}
            </Row>
        </Container>   
    )
}

export default Machine;
