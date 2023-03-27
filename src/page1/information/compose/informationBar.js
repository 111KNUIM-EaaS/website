import { Nav, Navbar } from 'react-bootstrap';
import { HouseFill, Clipboard2Plus, FuelPump } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
    const linkList = [ 
        {href: "/home", svg: <HouseFill size={30} className='pb-1' />, text: "Home"},
        {href: "/link1", svg: <Clipboard2Plus size={30} className='pb-1' />, text: "link1"},
        {href: "/link2", svg: <FuelPump size={30} className='pb-1'/>, text: "link2"}
    ];
    return (
        <Navbar>
            <Nav className="me-auto flex-column">
                {linkList.map( link => (
                    <Nav.Link key={link.href} className='d-flex'>
                        {link.svg}
                        <span className="d-flex d-none d-xxl-block fs-5 px-2">{link.text}</span>
                    </Nav.Link> 
                ))}
            </Nav>
        </Navbar>
    )
}

export default Sidebar