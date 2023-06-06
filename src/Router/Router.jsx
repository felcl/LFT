import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from '../View/Home'
import Swap from '../View/Swap'

export default function Router() {
    {/* 所有的路由配置均在 BrowserRouter 内部 */}
    return (
      <HashRouter>
        {/* 使用 Routes 替换曾经的 Switch */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Swap' element={<Swap />} />
        </Routes>
      </HashRouter>
    );
  }