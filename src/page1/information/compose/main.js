import { Container, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

function Main() { 
    return (
        <Container fluid className="d-flex flex-fill"> 
            <Row className="flex-fill align-items-center">
                <Col md={4}>Placeholder column 1</Col>
                <Col md={4}>
                    <div>
                        {/* {data ? <span>{data}</span> : <span>Loading...</span>} */}
                        Loading...
                    </div>
                </Col>
                <Col md={4}>Placeholder column 2</Col>
            </Row>
        </Container>   
    )
}

export default Main