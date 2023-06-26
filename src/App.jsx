import {useEffect} from 'react'
import { useDispatch ,useSelector} from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { useSearchParams} from "react-router-dom";
import {contract,contractInit,useConnectWallet} from './web3'
import Axios from './axios'
import Router from './Router/Router'
import Header from './components/Header'
import './App.css'

function App() {
  useConnectWallet()
  const web3React = useWeb3React();
  const [search] = useSearchParams();
  // const { chain, chains } = useNetwork()
  const Token = useSelector(Store =>Store.token)
  const StoreAddress = useSelector(Store =>Store.address)
  const dispatch = useDispatch()
  // const {isConnected, address } = useAccount()
  useEffect(()=>{
    /**
     * 以下几种情况需要重新登录
     * 本地未缓存地址
     * 缓存地址与当前连接地址不相同
     * 本地不存在token
     */
    if(web3React.active && (StoreAddress === '' || (StoreAddress !== web3React.account.toLowerCase()) || !Token)){
      /* 登录 */
      Axios.post('/uUser/auth',{
        chainType:1,
        userAddress:web3React.account,
        refereeAddress:search.get('address')
      }).then(res=>{
        dispatch({
          type:'SETTOKEN',
          token:res.data.data,
          address:web3React.account.toLowerCase()
        })
        console.log(res,"用户登录")
      })
    }
  },[web3React.active,web3React.account,Token,StoreAddress])
  useEffect(()=>{
    if(web3React.active && Object.keys(contract).length <=0){
      /* 初始化合约 */
      contractInit()
    }
  },[web3React.active])
  return (
    <>
    
      <Header></Header>
      <Router></Router>
    {/* <span onClick={()=>connect({ connector: connectors[1] })}> 链接</span> */}
    </>
  )
}

export default App
