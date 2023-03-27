import { Form, Nav, Navbar } from "react-bootstrap"
import { List, QuestionCircle, Grid3x3GapFill, PersonFill} from "react-bootstrap-icons"

import 'bootstrap/dist/css/bootstrap.min.css';;

let icons =  [
    {id: "QuestionCircle", svg: <QuestionCircle size={30}/>, href: "/information"},
    {id: "Grid3x3GapFill", svg: <Grid3x3GapFill size={30}/>, href: "/home"}
]



function Header() {    
    return (
        <Navbar style={{ height: "10vh", backgroundColor: 'rgb(238, 242, 249)' }}>
            <Nav className="p-4 d-none d-md-block">
                <List size={30}/>
            </Nav>
            <Navbar.Brand className="px-3">
                <a href="/home">
                    <img
                        alt="Eaas"
                        src=''
                        height={35}
                    />
                </a>
            </Navbar.Brand>
            <Form className="d-flex d-none d-md-block ps-5">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-5"
                    aria-label="Search"
                  />
            </Form> 
            <Nav className="ms-auto pe-4">
                {icons.map((icon,index) => (
                    <Nav.Link key={index} href={icon.href}>
                        {icon.svg}
                    </Nav.Link>
                ))}
                <Nav.Link>
                    <PersonFill size={30} /> 
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Header