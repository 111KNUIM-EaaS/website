import { Container, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
function Main() { 
    return (
        <Container fluid className="text-center"> 
            <Row className="h-50">
                <Col md={6} className="pt-4">
                    <h1>機器資訊</h1>
                </Col>
                <Col md={6} className="pt-4">
                    <h1>租借使用者</h1>
                </Col>
            </Row>
            <Row className="h-50">
                <Col md={6} className="pt-4">
                    <h1>使用狀態</h1>
                </Col>
                <Col md={6} className="pt-4">
                    <h1>機器控管</h1>
                </Col>
            </Row>
        </Container>   
    )
}

export default Main