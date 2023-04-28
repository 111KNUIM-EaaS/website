import { Container, Row, Col } from "react-bootstrap"
import { Card } from "react-bootstrap";
import {Clipboard2Plus, Receipt, HddStack } from 'react-bootstrap-icons';
import '../../home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
function Main() { 
    return (
        <Container fluid className="text-center"> 
            <Row className="h-100 align-items-center">
                <Col md={4} className="p-4 h-100 card__style" onClick={() => {window.location.href = "/home/machine";}}>
                    <Card className="h-100 card__inner">
                        <Card.Body className="card__body__background card__body__background--front">
                            <div className="fs-3"><h1>新增機器</h1></div>
                            <Clipboard2Plus size={200} className='pb-1' />
                        </Card.Body>
                        <Card.Body className="card__body__background card__body__background--back">
                            <div className="fs-3"><h1>新增機器</h1></div>
                            <Clipboard2Plus size={200} className='pb-1' />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="p-4 h-100 card__style" onClick={() => {window.location.href = "/home/state";}}>
                    <Card className="h-100 card__inner">
                        <Card.Body className="card__body__background card__body__background--front">
                            <div className="fs-3"><h1>機器狀態</h1></div>
                            <HddStack size={200} className='pb-1' />
                        </Card.Body>
                        <Card.Body className="card__body__background card__body__background--back">
                            <div className="fs-3"><h1>機器狀態</h1></div>
                            <HddStack size={200} className='pb-1' />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="p-4 h-100 card__style" onClick={() => {window.location.href = "/home/state";}}>
                    <Card className="h-100 card__inner">
                        <Card.Body className="card__body__background card__body__background--front">
                            <div className="fs-3"><h1>機器列表</h1></div>
                            <Receipt size={200} className='pb-1' />
                        </Card.Body>
                        <Card.Body className="card__body__background card__body__background--back">
                            <div className="fs-3"><h1>機器列表</h1></div>
                            <Receipt size={200} className='pb-1' />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>   
    )
}

export default Main;