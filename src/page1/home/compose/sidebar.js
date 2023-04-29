import React  from 'react';
import { useLocation } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HouseFill, Clipboard2Plus, HddStack, Github } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../home.css'
function Sidebar({ show, handleClose }) {
    const linkList = [ 
        {href: "/home/main", svg: <HouseFill size={40} className='pb-1' />, text: "主頁面"},
        {href: "/home/machine", svg: <Clipboard2Plus size={40} className='pb-1' />, text: "新增機器"},
        {href: "/home/state", svg: <HddStack size={40} className='pb-1' />, text: "機器列表"},
        {href: "https://github.com/111KNUIM-EaaS/", svg: <Github size={40} className='pb-1' />, text: "GitHub"},
        {href: "https://github.com/111KNUIM-EaaS/website", svg: <Github size={40} className='pb-1' />, text: "網站"},
        {href: "https://github.com/111KNUIM-EaaS/server_express", svg: <Github size={40} className='pb-1' />, text: "伺服器"},
        {href: "https://github.com/111KNUIM-EaaS/3D-machine", svg: <Github size={40} className='pb-1' />, text: "3D 列印機"},
        {href: "https://github.com/111KNUIM-EaaS/automation-guided-vehicle", svg: <Github size={40} className='pb-1' />, text: "AGV"},
        // {href: "/home/bill", svg: <Receipt size={30} className='pb-1'/>, text: "Bill"}
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
        <Offcanvas show={show} onHide={handleClose} className="" style={{ width: "300px" }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title />
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Navbar>
                    <Nav className="me-auto flex-column">
                        { isAtHome && linkList.map((link, index) => (
                            <Nav.Link key={index} href={link.href} className="d-flex sidebarLink">
                                {link.svg}
                                <span className="d-flex fs-3 px-2 w-10">{link.text}</span>
                            </Nav.Link> 
                        ))}
                        { isAtInformation && informationList.map((link, index) => (
                            <Nav.Link key={index} href={link.href} className="d-flex sidebarLink">
                            {link.svg}
                            <span className="d-flex fs-3 px-2 w-10">{link.text}</span>
                            </Nav.Link> 
                        ))}
                    </Nav>
                </Navbar>
            </Offcanvas.Body>
        </Offcanvas> 
    )
}

export default Sidebar;