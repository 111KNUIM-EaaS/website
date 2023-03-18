import { Nav, Navbar } from 'react-bootstrap';
import { HouseFill, Clipboard2Plus, FuelPump } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
    const linkList = [ 
        {href: "/home", svg: <HouseFill size={30} />, text: "Home"},
        {href: "/link1", svg: <Clipboard2Plus size={30} />, text: "link1"},
        {href: "/link2", svg: <FuelPump size={30} />, text: "link2"}
    ];
    return (
        <Navbar>
            <Nav className="me-auto flex-column">
                {linkList.map( link => (
                   <Nav.Link key={link.href} className='justify-content-center'>
                        {link.svg}<span className="d-none d-md-block">{link.text}</span>
                    </Nav.Link> 
                ))}
            </Nav>
        </Navbar>
    )
}

export default Sidebar