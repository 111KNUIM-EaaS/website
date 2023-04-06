import { Outlet } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => { 
    return(
        <Container fluid>
            <Row style={{ height:'95vh'}}>
                {/* <Col xs='auto' className="d-none d-md-block" style={{ backgroundColor: 'rgb(238, 242, 249)', height:'95vh'}}>
                    <Sidebar />
                </Col> */}
                <Col xs={true} className="d-flex" style={{ height:'95vh'}} >
                    <Outlet />
                </Col>
            </Row>
        </Container>
    )
}
export default Home 