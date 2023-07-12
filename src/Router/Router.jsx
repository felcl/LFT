import {useEffect} from 'react'
import { Route, Routes, useLocation} from "react-router-dom";
import Home from '../Page/Home'
import Swap from '../View/Swap'
import Convert from '../View/Convert'
import Wallet from '../View/Wallet'
import Subscribe from '../View/Subscribe'
import SwapRecord from '../View/SwapRecord'
import PledgedRecord from '../View/PledgedRecord'
import ConvertRecord from '../View/ConvertRecord'
import Invitation from '../View/Invitation'
import Slippage from '../View/Slippage'
import Earn from '../View/Earn'
import Stake from '../View/Stake'
import SwapChart from '../View/SwapChart'
import Asset from '../View/Asset'
import Team from '../View/Team'

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
          <Route path='/Convert' element={<Convert />} />
          <Route path='/Slippage' element={<Slippage />} />
          <Route path='/Wallet' element={<Wallet />} />
          <Route path='/Subscribe' element={<Subscribe />} />
          <Route path='/SwapRecord' element={<SwapRecord />} />
          <Route path='/PledgedRecord' element={<PledgedRecord />} />
          <Route path='/ConvertRecord' element={<ConvertRecord />} />
          <Route path='/Invitation' element={<Invitation />} />
          <Route path='/Earn' element={<Earn />} />
          <Route path='/Stake' element={<Stake />} />
          <Route path='/SwapChart' element={<SwapChart />} />
          <Route path='/Asset' element={<Asset />} />
          <Route path='/Team' element={<Team />} />
        </Routes>
    );
  }