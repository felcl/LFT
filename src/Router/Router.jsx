import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from '../View/Home'
import Swap from '../View/Swap'
import Convert from '../View/Convert'

export default function Router() {
    return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Swap' element={<Swap />} />
          <Route path='/Convert' element={<Convert />} />
        </Routes>
    );
  }