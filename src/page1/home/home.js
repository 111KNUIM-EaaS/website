import { Routes, Route } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap"
import Sidebar from "./compose/sidebar"
import Main from "./compose/main"
import Status from "./compose/status/status";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => { 
    return(
        <Container fluid>
            <Row style={{ height:'90vh'}}>
                <Col xs='auto' className="d-none d-xl-block" style={{ backgroundColor: 'rgb(238, 242, 249)', height:'90vh'}}>
                    <Sidebar />
                </Col>
                <Col xs={true}  className="d-flex">
                    <Routes>
                        <Route path="/home/main" element={<Main />}></Route>
                        <Route path="/home/status" element={<Status />}></Route>
                    </Routes>
                </Col>
            </Row>
        </Container>
    )
}
export default Home 