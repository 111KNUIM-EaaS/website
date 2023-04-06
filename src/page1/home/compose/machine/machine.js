import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationComponent from "../../../../compose/pagination";

const machineList = []
for(let i = 1; i <= 10; i++) {
    machineList.push({
        id: i,
        title: `machine${i}`,
        content: `machine${i}的資訊`
    });
}
    
const Machine = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(machineList.length / itemsPerPage);
    
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // slice()為原始隊列選擇start之至end（不包括end）的元素
    const currentItems = machineList.slice(startIndex, endIndex);

    return (
        <Container fluid>
            {currentItems.map((machine, index) => (
                <Row className="mt-5 pt-5 mx-3" key={index}>
                    <Col>
                        <Card className="fs-2">
                            <Card.Header>
                                {machine.title}
                            </Card.Header>
                            <Card.Body>
                                {machine.content}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
            <Row className="justify-content-center  mt-5 pt-5">
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

export default Machine;
