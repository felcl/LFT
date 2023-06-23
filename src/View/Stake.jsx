import '../assets/style/Stake.scss'
import { Popover} from 'antd';
import {useNavigate} from 'react-router-dom'
import JTReturn from '../assets/image/JTReturn.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import JTDown from '../assets/image/JTDown.png'
import { useEffect, useState } from 'react';
import Axios from '../axios';
import classNames from 'classnames';
import BigNumber from 'big.js'
import {useAccount, useNetwork} from 'wagmi'
import {getLFTBalance} from '../web3'
import { TokenConfig } from '../config';
export default function Stake() {
    const navigate = useNavigate();
    const [amount,setAmount] = useState('')
    const [Type,setType] = useState('LFT')
    const [LFTBalance,setLFTBalance] = useState(new BigNumber(0))
    const { chain, chains } = useNetwork()
    const {isConnected, address } = useAccount()
    useEffect(()=>{
        if(isConnected && chain.id === chains[0].id){
            getLFTBalance(address).then(res=>{
                setLFTBalance(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals))
                console.log(res,"用户LFT余额")
            })
        }

    },[isConnected,chain.id])
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
        if(!amount){
            return console.log('请输入数量')
        }
        if(new BigNumber(amount).lte(0)){
            return console.log('请输入正确的质押数量')
        }
        if(LFTBalance.lt(amount)){
            return console.log("余额不足")
        }
        if(Type === 'LFT'){
            Axios.post('/dao/stake',{
                amount
            }).then(res=>{
                console.log(res,'LFT质押数据')
            })
        }
        if(Type === 'ELFT'){
            Axios.post('/dao/elftPledge',{
                amount
            }).then(res=>{
                console.log(res,'ELFT质押数据')
            })
        }
    }
    const content = (
        <div className='PopoverContent'>
            <div className='SelItem' onClick={()=>{setType(Type === 'LFT' ? 'ELFT':'LFT')}}>
                <img src={LFTIcon} alt="" />{
                    Type === 'LFT' ? 'ELFT':'LFT'
                }
            </div>
        </div>
    );
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
                <Popover content={content} placement="bottom" overlayClassName="StakePopover" trigger="click">
                    <div className="selToken">
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
            <div className={classNames(['submit','flexCenter',{'Disable':!amount || new BigNumber(amount).lte(0)}])} onClick={Submit}>Confirm</div>
        </div>
        <div className="goRecord" onClick={()=>{navigate('/PledgedRecord?type='+Type)}}>
            {'Stake  record >'}
        </div>
    </div>
  )
}
