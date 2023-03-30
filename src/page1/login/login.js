import { Container, Row, Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginCard from "./compose/card";
import './login.css'

const Login = () => {
    return (
        <Container fluid className="login">
            <Row style={{ height: '90vh' }}>
                <Col className="d-flex  justify-content-center justify-content-md-end align-items-center">
                    <LoginCard />
                </Col>
            </Row>
        </Container>
    );
}

export default Login