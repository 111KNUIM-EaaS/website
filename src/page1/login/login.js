import React, { useState, useEffect } from 'react'
import { Container, Row, Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginCard from "./compose/card";
import './login.css'
import { authentication } from "../../compose/firebase";
import { onAuthStateChanged } from "firebase/auth";
// import apiConf from '../../conf/apiConf.json';

const Login = () => {
    // const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            // setUser(user);           
            // console.log("🚀 ~ file: header.js:21 ~ onAuthStateChanged ~ user:", user);

            // if( user !== null && window.location.pathname === "/") {
            //     window.location.href = "/home/main";
            // }
        });
    }, []);

    return (
        <Container fluid className="login">
            <Row style={{ height: '95vh' }}>
                <Col className="d-flex  justify-content-center justify-content-md-end align-items-center">
                    <LoginCard />
                </Col>
            </Row>
        </Container>
    );
}

export default Login;