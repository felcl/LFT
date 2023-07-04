import '../assets/style/Stake.scss'
import { Popover} from 'antd';
import { useWeb3React } from "@web3-react/core";
import { useConnectWallet, injected } from '../web3'
import {ChainId} from '../config'
import JTReturn from '../assets/image/JTReturn.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import JTDown from '../assets/image/JTDown.png'
import {useSearchParams,useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Axios from '../axios';
import { notification } from 'antd';
import BigNumber from 'big.js'
// import {useAccount, useNetwork, useSwitchNetwork, useConnect} from 'wagmi'
import { useSelector } from "react-redux";
import {getLFTBalance, stake, getLftAllowance, LftApprove} from '../web3'
import { TokenConfig, ContractAddress } from '../config';
import { useTranslation } from 'react-i18next'
export default function Stake() {
    const { t } = useTranslation()
    const Token = useSelector(Store =>Store.token)
    const [search] = useSearchParams();
    const web3React = useWeb3React();
    let Connect = useConnectWallet();
    // const { switchNetwork, isLoading:isLoadingSwitchNetwork } = useSwitchNetwork()
    const [LftAllowance , setLftAllowance] = useState(new BigNumber(0))
    const [inApprove,setInApprove] = useState(false)
    const [inStake,setInStake] = useState(false)
    const navigate = useNavigate();
    const [amount,setAmount] = useState('')
    const [openPopover,setOpenPopover] = useState(false)
    const [Type,setType] = useState(search.get('type') || 'LFT')
    const [LFTBalance,setLFTBalance] = useState(new BigNumber(0))
    const [ELFTBalance,setELFTBalance] = useState(new BigNumber(0))
    // const { chain, chains } = useNetwork()
    // const {isConnected, address } = useAccount()
    // const { connect, connectors, isLoading } = useConnect({
    //     chainId: arbitrumGoerli.id,
    // })
    useEffect(()=>{
        document.addEventListener('click',function(){
            setOpenPopover(false)
        });
    },[])
    useEffect(()=>{
        if(Token){
            Axios.get('/swap/exchangeBase').then(res=>{
                console.log(res,"余额")
                if(res.data.data){
                    res.data.data.forEach(item=>{
                        if(item.coin === 'ELFT'){
                            setELFTBalance(new BigNumber(item.coinAmount))
                        }
                    })
                }
            })
        }
    },[Token])
    useEffect(()=>{
        if(web3React.active){
            getLftAllowanceFun()
            getLFTBalance(web3React.account).then(res=>{
                setLFTBalance(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals))
                console.log(res,"用户LFT余额")
            })
        }
    },[web3React.active,web3React.account])
    const ConnectWallet = ()=>{
        Connect(injected,ChainId.ARB)
    }
    const getLftAllowanceFun = ()=>{
        getLftAllowance(web3React.account,ContractAddress.Pool).then(res=>{
          setLftAllowance(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals))
          console.log(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals).toString(),'LFT授权额度')
        })
    }
    const Approve = ()=>{
        if(inApprove){
            return notification.warning({
                message: 'Warning',
                description:t('Donotresubmit1')
            });
        }
        setInApprove(true)
        console.log(amount)
        LftApprove(web3React.account,ContractAddress.Pool,new BigNumber(amount).times(10 ** TokenConfig.LFT.decimals).toString()).then(()=>{
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
                description: t('pleaselogin')
            });
        }
        if(!amount){
            return notification.warning({
                message: 'Warning',
                description: t('Pleaseenterthe4')
            });
        }
        if(new BigNumber(amount).lte(0)){
            return notification.warning({
                message: 'Warning',
                description: t('Pleaseenterthe5')
            });
        }
        if(LFTBalance.lt(amount) && Type === 'LFT'){
            return notification.warning({
                message: 'Warning',
                description: t('Insufficientbalanceof')
            });
        }
        if(ELFTBalance.lt(amount) && Type === 'ELFT'){
            return notification.warning({
                message: 'Warning',
                description: 'ELFT余额不足'
            });
        }
        setInStake(true)
        if(Type === 'LFT'){
            Axios.post('/dao/stake',{
                amount
            }).then(res=>{
                if(res.data.code === 200){
                    stake(web3React.account,res.data.data).then(res=>{
                        console.log(res,"质押")
                        return notification.success({
                            message: 'Success',
                            description: t('Pledgesuccessful')
                        });
                    },()=>{
                        notification.error({
                            message: 'Error',
                            description: t('Pledgefailed')
                        });
                    }).finally(()=>{
                        setInStake(false)
                    })
                }else{
                    notification.error({
                        message: 'Error',
                        description: t('Pledgefailed')
                    });
                }
            },()=>{
                notification.error({
                    message: 'Error',
                    description: t('Pledgefailed')
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
                    description: t('Pledgesuccessful')
                });
            },()=>{
                notification.error({
                    message: 'Error',
                    description: t('Pledgefailed')
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
        if(!web3React.active){
            return <div className="submit flexCenter" onClick={ConnectWallet}>{t('Connectwallet')}</div>
        }
        if(!Token){
            return <div className='submit flexCenter Disable' onClick={Submit}>{t('Confirm')}</div>
        }
        if(!amount || new BigNumber(amount).lte(0)){
            return <div className='submit flexCenter Disable' onClick={Submit}>{t('Confirm')}</div>
        }
        if(amount && LftAllowance.lt(amount) && Type === 'LFT'){
            return <div className='submit flexCenter' onClick={Approve}>
                {
                    inApprove && <svg viewBox="25 25 50 50">
                                    <circle cx="50" cy="50" r="20"></circle>
                                </svg>
                }
                {t('Approve')}
            </div>
        }
        return <div className='submit flexCenter' onClick={Submit}>
                {
                    inStake && <svg viewBox="25 25 50 50">
                                    <circle cx="50" cy="50" r="20"></circle>
                                </svg>
                }
                {t('Confirm')}
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
            {t('Stake')}
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
                    <div className="label">{t('Youwillreceive')}</div>
                    <div className="value">eLFT</div>
                </div>
                {
                    Type === 'LFT' &&
                    <div className="InfoRow">
                        <div className="label">{t('Dailyreward')}</div>
                        <div className="value">1.1%</div>
                    </div>
                }
                <div className="InfoRow">
                    <div className="label">{t('Exchangerate')}</div>
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
