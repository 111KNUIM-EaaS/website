import {Routes, Route}  from "react-router-dom"
import Header from "./compose/header";
import Home from "./page1/home/home";
import Information from "./page1/information/information";
import Main from "./page1/home/compose/main/main";
import State from "./page1/home/compose/state/state";
import Bill from "./page1/home/compose/bill/bill";
import MachineInformation from "./page1/home/compose/machines_information/information";
import Login from "./page1/login/login";
import Machine from "./page1/home/compose/machine/machine";
import Text from "./page1/information/compose/text";
import Content from "./page1/information/compose/content";
import Book from "./page1/information/compose/book";

function App() {    
    return (
        <div>
            <Header/> 
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/home/" element={<Home />}>
                    <Route path="/home/main" element={<Main />}></Route>
                    <Route path="/home/state" element={<State />}></Route>
                    <Route path="/home/bill" element={<Bill />}></Route>
                    <Route path="/home/machine" element={<Machine />}></Route>
                    <Route path="/home/machine/information" element={<MachineInformation />}></Route>
                </Route>
                <Route path="/information/" element={<Information />}>
                    <Route path="/information/text" element={<Text />}></Route>
                    <Route path="/information/content" element={<Content />}></Route>
                    <Route path="/information/book" element={<Book />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
