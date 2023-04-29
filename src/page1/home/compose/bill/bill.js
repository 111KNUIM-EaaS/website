import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap"
import { authentication } from "../../../../compose/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../home.css';
import apiConf  from '../../../../conf/apiConf.json'
const Bill = () => {
    const [user, setUser] = useState(null);
    const [billData, setBillData] = useState([]);
    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            console.log("🚀 ~ file: bill.js:12 ~ onAuthStateChanged ~ user:", user);
            setUser(user);
            console.log("🚀 ~ file: bill.js:12 ~ onAuthStateChanged ~ user.uid:", user.uid);
            axios
                .post(`http://${apiConf.host}:${apiConf.port}/api/bills/table`, { uid: user.uid })
                .then(res => {
                    console.table("🚀 ~ file: bill.js:18 ~ useEffect ~ res data:", res.data.data);
                    setBillData(res.data.data);
                })
                .catch(err => {
                    console.log("🚀 ~ file: bill.js:22 ~ useEffect ~ err:", err)
                });
        });
    }, []);
    

    console.log("🚀 ~ file: bill.js:20 ~ Bill ~ billData", billData);

    return (
        <Container fluid>
            <Row className="p-4 row-height">
                <Col md={12}>
                    <Card className="row-height">
                        <Card.Body>
                            <Table striped bordered hover responsive className="text-center billing-table">
                                <thead>
                                    <tr>
                                        <th>訂單編號</th>
                                        <th>機器編號(ID)</th>
                                        <th>租借時間(Rental Times)</th>
                                        <th>總額(Total)</th>
                                        <th>機器類型(Machine Type)</th>   
                                    </tr>
                                </thead>
                                <tbody>
                                    {billData.length >= 1  ? (
                                        billData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item.machines_id}</td>
                                                <td>{item.machine_time}</td>
                                                <td>{item.total_value}</td>
                                                <td>{item.type_name}</td>
                                            </tr>

                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">目前沒有任何訂單</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Bill 