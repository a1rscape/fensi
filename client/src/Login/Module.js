import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home";

function Module() {
    return (
        <BrowserRouter>
            <div>
                <Route path="/Home" element={<Home/>}/>
            </div>
        </BrowserRouter>
    )
}

export default Module;