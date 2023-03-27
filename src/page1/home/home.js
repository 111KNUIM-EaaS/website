import { Container, Col, Row } from "react-bootstrap"
import Main from "./compose/main"
import Sidebar from "./compose/sidebar"
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => { 
    return(
        <Container fluid>
            <Row style={{ height:'90vh'}}>
                
                <Col xs='auto' className="d-none d-xl-block" style={{ backgroundColor: 'rgb(238, 242, 249)', height:'90vh'}}>
                    <Sidebar />
                </Col>
                <Col xs={true}  className="d-flex">
                    <Main/>
                </Col>
            </Row>
        </Container>
    )
}
export default Home 