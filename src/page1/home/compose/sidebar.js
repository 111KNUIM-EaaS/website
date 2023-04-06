import React  from 'react';
import { useLocation } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HouseFill, Clipboard2Plus, Receipt, HddStack } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../home.css'
function Sidebar({ show, handleClose }) {
    const linkList = [ 
        {href: "/home/main", svg: <HouseFill size={30} className='pb-1' />, text: "Home"},
        {href: "/home/machine", svg: <Clipboard2Plus size={30} className='pb-1' />, text: "Machine"},
        {href: "/home/state", svg: <HddStack size={30} className='pb-1' />, text: "State"},
        {href: "/home/bill", svg: <Receipt size={30} className='pb-1'/>, text: "Bill"}
    ]

    const informationList = [
        {href: "/information/book", svg: <HouseFill size={30} className='pb-1' />, text: "Book"},
        {href: "/information/text", svg: <Clipboard2Plus size={30} className='pb-1' />, text: "Text"},
        {href: "/information/content", svg: <HddStack size={30} className='pb-1' />, text: "Content"},
    ]

    const location        = useLocation();  
    const isAtHome        = location.pathname.startsWith('/home');
    const isAtInformation = location.pathname.startsWith('/information');
    
    return (
        <Offcanvas show={show} onHide={handleClose} className="" style={{ width: "200px" }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title />
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Navbar>
                    <Nav className="me-auto flex-column">
                        { isAtHome && linkList.map((link, index) => (
                            <Nav.Link key={index} href={link.href} className="d-flex sidebarLink">
                                {link.svg}
                                <span className="d-flex fs-5 px-2 w-10">{link.text}</span>
                            </Nav.Link> 
                        ))}
                        { isAtInformation && informationList.map((link, index) => (
                            <Nav.Link key={index} href={link.href} className="d-flex sidebarLink">
                            {link.svg}
                            <span className="d-flex fs-5 px-2 w-10">{link.text}</span>
                            </Nav.Link> 
                        ))}

                    </Nav>
                </Navbar>
            </Offcanvas.Body>
        </Offcanvas> 
    )
}

export default Sidebar