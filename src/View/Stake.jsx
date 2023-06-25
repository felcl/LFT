import '../assets/style/Stake.scss'
import { Popover} from 'antd';
import {useNavigate} from 'react-router-dom'
import JTReturn from '../assets/image/JTReturn.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import JTDown from '../assets/image/JTDown.png'
import { useEffect, useState } from 'react';
import Axios from '../axios';
import { notification } from 'antd';
import BigNumber from 'big.js'
import {useAccount, useNetwork, useSwitchNetwork, useConnect} from 'wagmi'
import { arbitrumGoerli} from 'wagmi/chains'
import { useSelector } from "react-redux";
import {getLFTBalance, stake, getLftAllowance, LftApprove} from '../web3'
import { TokenConfig, ContractAddress } from '../config';
export default function Stake() {
    const Token = useSelector(Store =>Store.token)
    const { switchNetwork, isLoading:isLoadingSwitchNetwork } = useSwitchNetwork()
    const [LftAllowance , setLftAllowance] = useState(new BigNumber(0))
    const [inApprove,setInApprove] = useState(false)
    const [inStake,setInStake] = useState(false)
    const navigate = useNavigate();
    const [amount,setAmount] = useState('')
    const [openPopover,setOpenPopover] = useState(false)
    const [Type,setType] = useState('LFT')
    const [LFTBalance,setLFTBalance] = useState(new BigNumber(0))
    const { chain, chains } = useNetwork()
    const {isConnected, address } = useAccount()
    const { connect, connectors, isLoading } = useConnect({
        chainId: arbitrumGoerli.id,
    })
    useEffect(()=>{
        document.addEventListener('click',function(){
            setOpenPopover(false)
        });
    },[])
    useEffect(()=>{
        if(isConnected && chain.id === chains[0].id){
            getLftAllowanceFun()
            getLFTBalance(address).then(res=>{
                setLFTBalance(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals))
                console.log(res,"用户LFT余额")
            })
        }
    },[isConnected,chain.id])
    const ConnectWallet = ()=>{
        if(isConnected && chain.id !== chains[0].id){
            return switchNetwork(arbitrumGoerli.id)
        }
        if(!isConnected){
            connect({ connector: connectors[1] })
        }
    }
    const getLftAllowanceFun = ()=>{
        getLftAllowance(address,ContractAddress.Pool).then(res=>{
          setLftAllowance(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals))
          console.log(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals).toString(),'LFT授权额度')
        })
    }
    const Approve = ()=>{
        if(inApprove){
            return notification.warning({
                message: 'Warning',
                description:
                '请勿重复提交'
            });
        }
        setInApprove(true)
        console.log(amount)
        LftApprove(address,ContractAddress.Pool,new BigNumber(amount).times(10 ** TokenConfig.LFT.decimals).toString()).then(()=>{
            getLftAllowanceFun()
        }).finally(()=>{
            setInApprove(false);
        })
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
    const changeAmount = (e)=>{
        setAmount(changeNumPut(e.target.value)) 
    }
    const Submit = ()=>{
        if(!Token){
            return notification.warning({
                message: 'Warning',
                description: '请先登录'
            });
        }
        if(!amount){
            return notification.warning({
                message: 'Warning',
                description: '请输入数量'
            });
        }
        if(new BigNumber(amount).lte(0)){
            return notification.warning({
                message: 'Warning',
                description: '请输入正确的质押数量'
            });
        }
        if(LFTBalance.lt(amount) && Type === 'LFT'){
            return notification.warning({
                message: 'Warning',
                description: 'LFT余额不足'
            });
        }
        setInStake(true)
        if(Type === 'LFT'){
            Axios.post('/dao/stake',{
                amount
            }).then(res=>{
                if(res.data.code === 200){
                    stake(address,res.data.data).then(res=>{
                        console.log(res,"质押")
                        return notification.success({
                            message: 'Success',
                            description: '质押成功'
                        });
                    },()=>{
                        notification.error({
                            message: 'Error',
                            description: '质押失败'
                        });
                    }).finally(()=>{
                        setInStake(false)
                    })
                }else{
                    notification.error({
                        message: 'Error',
                        description: '质押失败'
                    });
                }
            },()=>{
                notification.error({
                    message: 'Error',
                    description: '质押失败'
                });
                setInStake(false)
            })
        }
        if(Type === 'ELFT'){
            Axios.post('/dao/elftPledge',{
                amount
            }).then(res=>{
                console.log(res,'ELFT质押数据')
                return notification.success({
                    message: 'Success',
                    description: '质押成功'
                });
            },()=>{
                notification.error({
                    message: 'Error',
                    description: '质押成功'
                });
            }).finally(()=>{
                setInStake(false)
            })
        }
    }
    const content = (
        <div className='PopoverContent'>
            <div className='SelItem' onClick={(e)=>{setType(Type === 'LFT' ? 'ELFT':'LFT');setOpenPopover(false);e.stopPropagation()}}>
                <img src={LFTIcon} alt="" />{
                    Type === 'LFT' ? 'ELFT':'LFT'
                }
            </div>
        </div>
    );
    const SubmitBtnRunder = ()=>{
        if(!address || chain.id !== chains[0].id){
            return <div className="submit flexCenter" onClick={ConnectWallet}>Connect wallet</div>
        }
        if(!Token){
            return <div className='submit flexCenter Disable' onClick={Submit}>Confirm</div>
        }
        if(!amount || new BigNumber(amount).lte(0)){
            return <div className='submit flexCenter Disable' onClick={Submit}>Confirm</div>
        }
        if(amount && LftAllowance.lt(amount)){
            return <div className='submit flexCenter' onClick={Approve}>
                {
                    inApprove && <svg viewBox="25 25 50 50">
                                    <circle cx="50" cy="50" r="20"></circle>
                                </svg>
                }
                Approve
            </div>
        }
        return <div className='submit flexCenter' onClick={Submit}>
                {
                    inStake && <svg viewBox="25 25 50 50">
                                    <circle cx="50" cy="50" r="20"></circle>
                                </svg>
                }
                Confirm
            </div>
        // if(!Token){
        //     return 'submit flexCenter Disable'
        // }
        // if(!amount || new BigNumber(amount).lte(0)){
        //     return 'submit flexCenter Disable'
        // }
        // return 'submit flexCenter'
    }
  return (
    <div className='Stake'>
        <div className="Title">
            <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
            Stake
            <span></span>
        </div>
        <div className="StakeBox">
            <div className="PutAmount">
                <input type="text" placeholder='Please enter your amount' value={amount} onChange={changeAmount} />
                <Popover content={content} placement="bottom" overlayClassName="StakePopover" trigger="click" open={openPopover} autoFocus={false}>
                    <div className="selToken" onClick={(e)=>{setOpenPopover(!openPopover);e.stopPropagation()}}>
                        <img src={LFTIcon} alt="" />
                        {Type}
                        <img src={JTDown} alt="" />
                    </div>
                </Popover>
            </div>
            <div className="StakeInfo">
                <div className="InfoRow">
                    <div className="label">You will receive</div>
                    <div className="value">eLFT</div>
                </div>
                <div className="InfoRow">
                    <div className="label">Daily reward</div>
                    <div className="value">1.1%</div>
                </div>
                <div className="InfoRow">
                    <div className="label">Exchange rate</div>
                    <div className="value">1 eLFT = 1 LFT</div>
                </div>
            </div>
            {
                SubmitBtnRunder()
            }
        </div>
        <div className="goRecord" onClick={()=>{navigate('/PledgedRecord?type='+Type)}}>
            {'Stake  record >'}
        </div>
    </div>
  )
}
