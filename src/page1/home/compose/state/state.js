import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap"
import { Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationComponent from "../../../../compose/pagination";

const stateList = []
for(let i = 1; i <= 10; i++) {
    stateList.push({
        id: i,
        title: `state${i}`,
        content: `machine${i}的狀態`
    });
}

const State = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(stateList.length / itemsPerPage);
    
    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = stateList.slice(startIndex, endIndex);


    return (
        <Container fluid>
            {currentItems.map((state, index) => ( 
                <Row className="mt-5 pt-5 mx-3" key={index}>
                    <Col>
                        <Card className="fs-2">
                            <Card.Header>
                                {state.title}
                            </Card.Header>
                            <Card.Body>
                                {state.content}
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
