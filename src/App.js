import { Routes, Route }    from "react-router-dom"
import Header               from "./compose/header";
import Home                 from "./page1/home/home";
import Main                 from "./page1/home/compose/main/main";
import State                from "./page1/home/compose/state/state";
import Login                from "./page1/login/login";
import Machine              from "./page1/home/compose/machine/machine";
import MachineInformation   from "./page1/home/compose/machines_information/information";

function App() {    
    return (
        <div>
            <Header/> 
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/home/" element={<Home />}>
                    <Route path="/home/main" element={<Main />}></Route>
                    <Route path="/home/state" element={<State />}></Route>
                    <Route path="/home/machine" element={<Machine />}></Route>
                    <Route path="/home/machine/information" element={<MachineInformation />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
