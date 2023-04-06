import { useState} from "react";
import { List } from "react-bootstrap-icons";
import  Sidebar  from  '../page1/home/compose/sidebar.js'
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const handleShowSidebar = () => setShowSidebar(true);
    const handleCloseSidebar = () => setShowSidebar(false);
    return (
        <>
            <List size={30} onClick={handleShowSidebar} />
            <Sidebar show={showSidebar} handleClose={handleCloseSidebar} />
        </>
    );
}

export default Menu;