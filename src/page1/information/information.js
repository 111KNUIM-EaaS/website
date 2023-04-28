import { Outlet } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const Information = () => { 
    return (
        <Container fluid>
            <Row style={{ height:'95vh'}}>
                <Col xs={true} className="d-flex" style={{ height:'95vh'}} >
                    <Outlet />
                </Col>
            </Row>
        </Container>
    )
}
export default Information;