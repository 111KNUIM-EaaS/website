import { Card, Container, Row, Col, Table } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../home.css';
const Bill = () => {
    const data = [
        { id: 1, machineType: 'Excavator', rentalTimes: "1:10:10", total: 1500 },
        { id: 2, machineType: 'Bulldozer', rentalTimes: "1:10:10", total: 1000 },
        { id: 3, machineType: 'Loader', rentalTimes: "1:10:10", total: 1260 },
        { id: 4, machineType: 'Crane', rentalTimes: "40:10", total: 750 },
    ];
    return (
        <Container fluid>
            <Row className="p-4 row-height">
                <Col md={12}>
                    <Card className="row-height">
                        <Card.Header className="text-center flex">XXX帳單</Card.Header>
                        <Card.Body>
                                <Table striped bordered hover responsive className="text-center billing-table">
                                    <thead>
                                        <tr>
                                            <th>編號(ID)</th>
                                            <th>機器類型(Machine Type)</th>
                                            <th>租借時間(Rental Times)</th>
                                            <th>總額(Total)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.machineType}</td>
                                                <td>{item.rentalTimes}</td>
                                                <td>{item.total}</td>
                                            </tr>
                                            ))}
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