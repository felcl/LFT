import {useEffect} from 'react'
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork} from 'wagmi'
import { useDispatch ,useSelector} from "react-redux";
// import { switchNetwork, getNetwork } from '@wagmi/core'
import { HashRouter} from "react-router-dom";
import {contract,contractInit} from './web3'
import Axios from './axios'
import Router from './Router/Router'
import Header from './components/Header'
import './App.css'

function App() {
  // const { switchNetwork  } = useSwitchNetwork()
  const Token = useSelector(Store =>Store.token)
  const StoreAddress = useSelector(Store =>Store.address)
  console.log()
  const dispatch = useDispatch()
  const {isConnected, address } = useAccount()
  useEffect(()=>{
    if(isConnected && Object.keys(contract).length <=0){
      /* 初始化合约 */
      contractInit()
    }
    /**
     * 以下几种情况需要重新登录
     * 本地未缓存地址
     * 缓存地址与当前连接地址不相同
     * 本地不存在token
     */
    if(isConnected && (StoreAddress === '' || (StoreAddress !== address.toLowerCase()) || !Token)){
      /* 登录 */
      Axios.post('/uUser/auth',{
        chainType:1,
        userAddress:address,
        refereeAddress:''
      }).then(res=>{
        dispatch({
          type:'SETTOKEN',
          token:res.data.data,
          address:address.toLowerCase()
        })
        console.log(res,"用户登录")
      })
    }
  },[isConnected,address,Token,StoreAddress])
  // const { chain, chains } = useNetwork()
  // const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
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
