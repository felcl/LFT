import { useState , useEffect} from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { HashRouter, Route, Routes} from "react-router-dom";
import Router from './Router/Router'
import Header from './components/Header'
import './App.css'

function App() {
  
  const [count, setCount] = useState(0)
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

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
