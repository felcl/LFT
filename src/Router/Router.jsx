import {useEffect} from 'react'
import { Route, Routes, useLocation} from "react-router-dom";
import Home from '../View/Home'
import Swap from '../View/Swap'
import Convert from '../View/Convert'
import Wallet from '../View/Wallet'
import Subscribe from '../View/Subscribe'
import SwapRecord from '../View/SwapRecord'
import PledgedRecord from '../View/PledgedRecord'
import ConvertRecord from '../View/ConvertRecord'
import Team from '../View/Team'
import Slippage from '../View/Slippage'

export default function Router() {
    const location = useLocation();
    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      },[location.pathname])
    return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Swap' element={<Swap />} />
          <Route path='/Slippage' element={<Slippage />} />
          <Route path='/Convert' element={<Convert />} />
          <Route path='/Wallet' element={<Wallet />} />
          <Route path='/Subscribe' element={<Subscribe />} />
          <Route path='/SwapRecord' element={<SwapRecord />} />
          <Route path='/PledgedRecord' element={<PledgedRecord />} />
          <Route path='/ConvertRecord' element={<ConvertRecord />} />
          <Route path='/Team' element={<Team />} />
        </Routes>
    );
  }