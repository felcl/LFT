import { Route, Routes } from "react-router-dom";
import Home from '../View/Home'
import Swap from '../View/Swap'
import Convert from '../View/Convert'
import Wallet from '../View/Wallet'
import Subscribe from '../View/Subscribe'
import SwapRecord from '../View/SwapRecord'

export default function Router() {
    return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Swap' element={<Swap />} />
          <Route path='/Convert' element={<Convert />} />
          <Route path='/Wallet' element={<Wallet />} />
          <Route path='/Subscribe' element={<Subscribe />} />
          <Route path='/SwapRecord' element={<SwapRecord />} />
        </Routes>
    );
  }