import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Google } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signInWithGoogle } from '../../../compose/firebase';
function LoginCard() {
    
    return (
        <Card className="mx-4" style={{ width: '40vw' }}>
            <Card.Body>
                <Row>
                    <Col>
                        <h1>開南大學</h1>
                        <h1>資管系專題</h1>
                        <h2>111學年度</h2>
                        <h3>設備即服務 EaaS</h3>
                        <h3>Equipment as a Service</h3>
                    </Col>
                    <Col>
                        <img src='/images/PCB.png' alt='PCB' width='100%' />
                    </Col>
                </Row>
                <br />
                <hr></hr>
                <h4>請使用 Google 帳號登入</h4>
                <div className="d-grid gap-2">
                    <Button className='mt-2' size="lg" variant="outline-primary" onClick={signInWithGoogle}><Google size={30}></Google>&emsp;google 登錄</Button> 
                </div>
            </Card.Body>
        </Card>
    )
}

export default LoginCard;