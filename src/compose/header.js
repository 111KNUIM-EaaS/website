import React, { useState, useEffect } from 'react'
import {Nav, Navbar} from "react-bootstrap"
import { QuestionCircle, Grid3x3GapFill, PersonFill, Github } from "react-bootstrap-icons"
import { authentication } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Menu from "./menu";
import UserLogin from "../page1/login/compose/userLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import apiConf from '../conf/apiConf.json';

let icons =  [
    {id: "QuestionCircle",  svg: <QuestionCircle size={30}/>,   href: "https://github.com/orgs/111KNUIM-EaaS/"},
    {id: "Grid3x3GapFill",  svg: <Grid3x3GapFill size={30}/>,   href: "/home/main"},
    {id: "Github",          svg: <Github size={30} />,          href: "https://github.com/orgs/111KNUIM-EaaS/"}
];

function Header() {    
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            setUser(user);

            if( user !== null ) {
                user.getIdToken().then((idToken) => {
                    const data = {
                        email: user.email,
                        name: user.displayName,
                    };

                    const headers = {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'User': user.uid,
                        'Authorization': idToken
                    };

                    // console.log(`[L][${(new Date()).toLocaleString()}]📝 header.js[/api/users/google/login] 🔊 data:`, data, `headers:`, headers);

                    axios.post(`${apiConf.URL || "" }/api/users/google/login`, data, { headers: headers })
                        .then(res => {
                            // console.log(`[L][${(new Date()).toLocaleString()}]📝 header.js[/api/users/google/login] 🔊 res data:`, res.data);
                            if( window.location.pathname === "/" ) {
                                window.location.href = "/home/main";
                            }
                        })
                        .catch(err => {
                            console.error(`[E][${(new Date()).toLocaleString()}]📝 header.js[/api/users/google/login] 🔊 res Error:`, err);
                            // window.location.reload();
                        });
                });
            }

            if( user === null && window.location.pathname !== "/") {
                window.location.href = "/";
            }
        });
    }, []);

    return (
        <Navbar style={{ height: "5vh", backgroundColor: 'rgb(238, 242, 249)', position: "relative", zIndex: 2}}>
            { user ? <Nav className="p-2"><Menu /></Nav> : <Nav className="p-4 d-none d-md-block"></Nav>}
            <Navbar.Brand className="px-3">
            <a href="/home/main" style={{ textDecoration: "none" }}>
                <img className="pb-2"
                    alt="EaaS"
                    src={('/images/PCB.png')}
                    height={40}
                />
                <span className="ms-2" style={{ fontSize: "2rem", fontWeight: "bold" }}>開南大學專題 EaaS 設備即服務</span>
            </a>
            </Navbar.Brand>
            <Nav className="ms-auto pe-4">
                {icons.map((icon,index) => (
                    <Nav.Link key={index} href={icon.href}>
                        {icon.svg}
                    </Nav.Link>
                ))}
                { user ? <Nav.Link><UserLogin user={user} /> </Nav.Link> : <Nav.Link  href="/"><PersonFill  size={30} /></Nav.Link> }
            </Nav>
        </Navbar>
    )
}

export default Header