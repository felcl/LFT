import {useEffect, useState} from 'react'
import { Modal,notification} from 'antd';
import { useDispatch ,useSelector} from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { useSearchParams} from "react-router-dom";
import { useTranslation } from 'react-i18next'
import {contract,contractInit,useConnectWallet} from './web3'
import Axios from './axios'
import Router from './Router/Router'
import Header from './components/Header'
import CloseIcon from './assets/image/CloseIcon.png'
import './App.css'

function App() {
  useConnectWallet(true)
  const { t } = useTranslation()
  const [,setIsBind] = useState(-1)
  const web3React = useWeb3React();
  const [search] = useSearchParams();
  const [isinvitationModal, setIsinvitationModal] = useState(true);
  const [invitationAddr,setInvitationAddr] = useState('')
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
        refereeAddress:search.get('invite')
      }).then(res=>{
        dispatch({
          type:'SETTOKEN',
          token:res.data.data,
          address:web3React.account.toLowerCase()
        })
        console.log(res,"用户登录")
      })
    }
    if(Token){
      Axios.get('/uUser/checkBind').then(res=>{
        if(res.data.data === 0 && res.data.code === 200){
          setIsBind(true)
        }
        if(res.data.data === 1 && res.data.code === 200){
          setIsBind(false)
        }
          console.log(res,'用户是否绑定上级')
      })
    }

  },[web3React.active,web3React.account,Token,StoreAddress])
  useEffect(()=>{
    if(web3React.active && Object.keys(contract).length <=0){
      /* 初始化合约 */
      contractInit()
    }
  },[web3React.active])
  const changeInvitationAddr = (e) => {
      setInvitationAddr(e.target.value)
      // console.log(e.target.value)
  }
  const invitationAddrFun = () => {
    if(!invitationAddr){
        return notification.open({
            message: 'Error',
            description:t('Pleaseenterthe3')
        });
    }
    Axios.post('/uUser/bind',{
        refereeUserAddress:invitationAddr
    }).then(res=>{
      if(res.data.code === 200){
        setIsinvitationModal(false)
        notification.open({
            message: 'Success',
            description:t('bindsuccessfully')
        });
    }else{
        console.log(res.data.msg)
        notification.open({
            message: 'Success',
            description:t('bindingfailed')
        });
    }
    })
}
  return (
    <>
    
      <Header></Header>
      <Router></Router>
    {/* <span onClick={()=>connect({ connector: connectors[1] })}> 链接</span> */}
        {/* 邀请弹窗 */}
    <Modal open={isinvitationModal} onCancel={()=>{setIsinvitationModal(false)}} closable={false} maskClosable={false} footer={null} wrapClassName="modalBox" width="676px">
      <div className="Title">{t('Invitationaddress')}</div>
      <div className='putBox'>
          <input type="text" placeholder='Enter invitation address' onChange={changeInvitationAddr} />
      </div>
      <div className="Confirm flexCenter" onClick={invitationAddrFun}>{t('Confirm')}</div>
    </Modal>
    </>
  )
}

export default App
