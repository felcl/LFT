import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
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
    <Header></Header>
    <Router></Router>
    {/* <span onClick={()=>connect({ connector: connectors[1] })}> 链接</span> */}
    </>
  )
}

export default App
