import {useEffect} from 'react'
// import { arbitrum} from 'wagmi/chains'
import { useAccount, useNetwork, useSwitchNetwork} from 'wagmi'
import { useDispatch ,useSelector} from "react-redux";
// import { switchNetwork, getNetwork } from '@wagmi/core'
import { HashRouter,useSearchParams} from "react-router-dom";
import {contract,contractInit} from './web3'
import Axios from './axios'
import Router from './Router/Router'
import Header from './components/Header'
import './App.css'

function App() {
  const { switchNetwork  } = useSwitchNetwork()
  const [search] = useSearchParams();
  const { chain, chains } = useNetwork()
  const Token = useSelector(Store =>Store.token)
  const StoreAddress = useSelector(Store =>Store.address)
  const dispatch = useDispatch()
  const {isConnected, address } = useAccount()
  useEffect(()=>{
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
        refereeAddress:search.get('address')
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
  useEffect(()=>{
    if(isConnected && Object.keys(contract).length <=0 && chain.id === chains[0].id){
      /* 初始化合约 */
      contractInit()
    }
    if(chain && chain.id !== chains[0].id && isConnected){
      console.log(switchNetwork)
      // setTimeout(()=>{
      // },1000)
      // connect({ connector: connectors[1] })
      //销毁合约
    }
  },[isConnected,chain])
  return (
    <>
    
      <Header></Header>
      <Router></Router>
    {/* <span onClick={()=>connect({ connector: connectors[1] })}> 链接</span> */}
    </>
  )
}

export default App
