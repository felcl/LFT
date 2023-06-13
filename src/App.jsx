import { useState , useEffect} from 'react'
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork} from 'wagmi'
import { switchNetwork, getNetwork } from '@wagmi/core'
import { HashRouter, Route, Routes} from "react-router-dom";
import Router from './Router/Router'
import Header from './components/Header'
import './App.css'

function App() {
  const { switchNetwork  } = useSwitchNetwork()
  const { connector, isConnected } = useAccount()
  const { chain, chains } = useNetwork()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  // useEffect(()=>{
  //   if(isConnected && chain !== chains[0].id){
  //     switchNetwork(chains[0].id)
  //   }
  // },[isConnected])
  return (
    <>
    <HashRouter>
      <Header></Header>
      <Router></Router>
    </HashRouter>
    {/* <span onClick={()=>connect({ connector: connectors[1] })}> 链接</span> */}
    </>
  )
}

export default App
