import React from 'react';
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import { authentication } from '../../../compose/firebase';
import { DoorOpen } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function LogOut() { 
    authentication.signOut();
    window.location.href= "/";
}

const UserLogin = ({ user }) => {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    return (
        <div>
            <img src={user.photoURL} alt={user.displayName} width={30} height={30} className="rounded-circle" onClick={toggleShowA}/>
            <Toast show={showA} onClose={toggleShowA}  className='text-center' style={{position: "absolute", top: 45, right: 30, borderRadius: 20}}>
                <Toast.Header style={{ backgroundColor: "rgb(50, 54, 57)", color:"#ffffff"}}>
                    <strong className="me-auto">{user.displayName}</strong>
                </Toast.Header>
                <Toast.Body style={{ backgroundColor:"rgb(95, 99, 104)", color:"#ffffff", borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px',}}>
                    <Row>
                        <Col xs={4}><img src={user.photoURL} alt={user.displayName} width={80} height={80} className="rounded-circle" onClick={toggleShowA}/></Col>
                        <Col xs={8} className=''>
                            <Row className='pt-3'>{user.displayName}</Row>
                            <Row className='pt-2'>{user.email}</Row>                       
                        </Col>
                    </Row>
                    <hr />
                    <Row className='mx-2 mb-2'>
                        <Button  className='px-1'variant="secondary" onClick={LogOut}>
                            <DoorOpen size={20} className='ms-1' />
                            Logout
                        </Button>
                    </Row>
                </Toast.Body>
            </Toast>
        </div>
    )
 }

export default UserLogin;