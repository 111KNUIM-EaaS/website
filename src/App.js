import {Routes, Route}  from "react-router-dom"
import Header from "./compose/header";
import Home from "./page1/home/home";
import Information from "./page1/information/indromation";
function App() {
    return (
        <div>
            <Header /> 
            <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/information" element={<Information />}></Route>
            </Routes>
        </div>
    );
}

export default App;
