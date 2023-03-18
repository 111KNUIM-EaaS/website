import { Container, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

function Main() { 
    const [data, setData] = useState("null");

    useEffect(() => {
        fetch('http://192.168.101.15:3000/content')
        .then((res) => res.json())
        .then((data) => {
            setData(JSON.stringify(data.message[0].user_name));
            console.log("data:", data.id);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setData('Error fetching data');
        });
    }, []);

    return (
        <Container fluid className="d-flex flex-fill"> 
            <Row className="flex-fill align-items-center">
                <Col md={4}>Placeholder column 1</Col>
                <Col md={4}>
                    <div>
                        {data ? <span>{data}</span> : <span>Loading...</span>}
                    </div>
                </Col>
                <Col md={4}>Placeholder column 2</Col>
            </Row>
        </Container>   
    )
}

export default Main