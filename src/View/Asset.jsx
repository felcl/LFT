import '../assets/style/Asset.scss'
import { Empty, Modal, notification, Table} from 'antd';
import { useWeb3React } from "@web3-react/core";
import { useConnectWallet, injected } from '../web3'
import {ChainId} from '../config'
// import LFTIcon from '../assets/image/LFTIcon.png'
// import JTDown from '../assets/image/JTDown.png'
import CloseIcon from '../assets/image/CloseIcon.png'
// import {useAccount, useNetwork, useSwitchNetwork, useConnect} from 'wagmi'
// import { arbitrumGoerli} from 'wagmi/chains'
import {useEffect, useState} from 'react'
import Axios from '../axios'
import {drawToken} from '../web3'
import BigNumber from 'big.js';
import { useSelector } from "react-redux";
import { AddrHandle, dateFormat } from '../utils/tool';
export default function Asset() {
    const web3React = useWeb3React();
    let Connect = useConnectWallet();
    const [scrollObj,setScrollObj] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const { switchNetwork, isLoading:isLoadingSwitchNetwork } = useSwitchNetwork()
    const [amount, setAmount] = useState('')
    const [LFTAmount,setLftAmount] = useState(0)
    const [ELFTAmount,setELFTAmount] = useState(0)
    // const {isConnected, address } = useAccount()
    // const { chain, chains } = useNetwork()
    const [inWithdraw,setInWithdraw] = useState(false)
    const [drawDetail,setdrawDetail] = useState([])
    const [HomeData,setHomeData] = useState(null)
    const Token = useSelector(Store =>Store.token)
    // const { connect, connectors, isLoading } = useConnect({
    //     chainId: arbitrumGoerli.id,
    // })
    useEffect(()=>{
        if(document.body.clientWidth <= 450){
            setScrollObj({
                x:500
            })
        }
    },[])
    useEffect(()=>{
        if(Token){
            Axios.get('/uUser/userAccount').then(res=>{
                console.log(res,'用户账户信息')
                if(res.data.code === 200 && res.data.data){
                    res.data.data.forEach(item=>{
                        if(item.coinName === 'LFT'){
                            setLftAmount(item.amount)
                        }
                        if(item.coinName === 'ELFT'){
                            setELFTAmount(item.amount)
                        }
                    })
                }
            })
            Axios.get('/dao/drawDetail').then(res=>{
                if(res.data.code === 200 && res.data.data){
                    setdrawDetail(res.data.data)
                }
                console.log(res,"用户提现记录")
            })
            Axios.get('/home/data').then((res)=>{
                setHomeData(res.data.data)
                console.log("首页数据",res)
            })
        }
    },[Token])
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showWithdrawModal = ()=>{
        if(amount && new BigNumber(amount).lte(0)){
            return notification.warning({
                message: 'Warning',
                description:
                '请输入正确的提现数量'
            });
        }
        setIsModalOpen(true);
    }
    const Submit = ()=>{
        if(inWithdraw){
            return notification.warning({
                message: 'Warning',
                description:
                '请勿重复提交'
            });
        }
        if(!Token){
            return notification.warning({
                message: 'Warning',
                description:
                '请登录后再试'
            });
        }
        if(!amount){
            return notification.warning({
                message: 'Warning',
                description:
                '请输入提取数量'
            });
        }
        if(new BigNumber(LFTAmount).lt(amount)){
            return notification.warning({
                message: 'Warning',
                description:
                '可领取量不足'
            });
        }
        setInWithdraw(true)
        Axios.post('/dao/draw',{
            amount
        }).then(res=>{
            if(res.data.code === 200){
                drawToken(web3React.account,res.data.data
                ).then(()=>{
                    notification.success({
                        message: 'Success',
                        description:"提现成功"
                    });
                    setIsModalOpen(false);
                },()=>{
                    notification.error({
                        message: 'Error',
                        description:"提现失败"
                    });
                }).finally(()=>{
                    setInWithdraw(false)
                })
            }else{
                setInWithdraw(false)
                notification.error({
                    message: 'Error',
                    description:res.data.msg
                });
            }
            console.log(res,"提现加密数据")
        },()=>{
            setInWithdraw(false)
        })
    }
    const putAmoubt = (e)=>{
        let putVal = changeNumPut(e.target.value)
        setAmount(putVal)
    }
    const changeNumPut = (value, accuracy)=>{
        if (/^\./g.test(value)) {
          value = "0" + value;
        }
        let putVal = value.replace(/[^\d.]/g, "");
        if(putVal.split('.').length>2){
          putVal = [putVal.split('.')[0],putVal.split('.').slice(1,3).join('')].join('.')
        }
        if (accuracy !== undefined) {
          let putArr = putVal.split(".");
          if (putArr[1] && putArr[1].length > accuracy) {
            putArr[1] = putArr[1].slice(0, accuracy);
          }
          putVal = putArr.join(".");
        }
        return putVal;
    }
    const ConnectWallet = ()=>{
        Connect(injected,ChainId.ARB)
    }
    const WithdrawRunder = ()=>{
        if(!web3React.active){
            return <div className="WithdrawBtn flexCenter" onClick={ConnectWallet}>Connect wallet</div>
        }
        return <div className="WithdrawBtn flexCenter" onClick={showWithdrawModal}>Withdraw</div>
    }
    // const content = (
    //     <div className='PopoverContent'>
    //         <div className='SelItem'>
    //             <img src={LFTIcon} alt="" />USDT
    //         </div>
    //         <div className='SelItem'>
    //             <img src={LFTIcon} alt="" />SLFT
    //         </div>
    //     </div>
    // );
    const columns = [
        {
          dataIndex: 'userAddress',
          key: 'userAddress',
          align:'center',
          width:'180px',
          render: (userAddress)=>{
            return AddrHandle(userAddress,6,6)
          }
        },
        {
          dataIndex: 'drawAmount',
          key: 'drawAmount',
          render:(drawAmount)=><span className='drawAmount'>{ drawAmount }LFT</span>,
          align:'center'
        },
        {
          dataIndex: 'createTime',
          key: 'createTime',
          align:'center',
          width:'200px',
          render: (createTime) => {
            return dateFormat('YYYY/mm/dd HH:MM:SS',new Date(createTime))
          }
        },
    ];
  return (
    <div className='Asset'>
        <div className="Title">Asset</div>
        <div className="AssetBox">
            <div className="TotalInfo">
                <div className="TotalItem">
                    <div className="label">Total network</div>
                    {
                        HomeData && <div className="value">$ {HomeData.totalPledgeAmount}</div>
                    }
                </div>
                <div className="separate"></div>
                <div className="TotalItem flexEnd">
                    <div className="label">DAO Treasury</div>
                    {
                        HomeData &&<div className="value">$ {HomeData.totalReward}</div>
                    }
                </div>
            </div>
            <div className="balanceRow">
                <div className="balanceItem">
                    <div className="label">LFT balance</div>
                    <div className="value">{LFTAmount}</div>
                </div>
                <div className="balanceItem">
                    <div className="label">eLFT balance</div>
                    <div className="value">{ELFTAmount}</div>
                </div>
            </div>
            {/* <div className="WithdrawBtn flexCenter" onClick={showWithdrawModal}>Withdraw</div> */}
            {WithdrawRunder()}
        </div>
        <div className="WithdrawRecord">
            <div className="WithdrawRecordTitle flexCenter">Withdraw record</div>
            {
                drawDetail.length > 0 ?
                // drawDetail.map((item,index)=><div className="recordItem" key={index}>
                //     <div className="address">{AddrHandle(item.userAddress,6,6)}</div>
                //     <div className="amount">{item.drawAmount} LFT</div>
                //     <div className="time">{dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime))}</div>
                // </div>)
                <Table dataSource={drawDetail.slice(0,5)} columns={columns} rowKey="id" pagination={false} scroll={scrollObj} />
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>
                {/* 领取收益弹窗 */}
        <Modal open={isModalOpen} onCancel={handleCancel} closable={false} footer={null} wrapClassName="modalBox" width="676px" maskClosable={true}>
            <img className="Close" src={CloseIcon} onClick={handleCancel} alt="" />
            <div className="Title">Withdraw</div>
            <div className='putBox'>
                <input type="text" placeholder='Enter the withdrawal amount' value={amount} onChange={putAmoubt} />
                {/* <Popover content={content} placement="bottom" overlayClassName="TeamPopover" trigger="click">
                    <div className="selToken">
                        <img src={LFTIcon} alt="" />
                        LFT
                        <img src={JTDown} alt="" />
                    </div>
                </Popover> */}
            </div>
            <div className="Confirm flexCenter" onClick={Submit}>
                {
                    inWithdraw && <svg viewBox="25 25 50 50">
                                    <circle cx="50" cy="50" r="20"></circle>
                                </svg>
                }
                Confirm
            </div>
        </Modal>
    </div>
  )
}
