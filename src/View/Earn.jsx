import '../assets/style/Earn.scss'
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import JTReturn from '../assets/image/JTReturn.png'
import { useEffect, useState } from 'react';
import Axios from '../axios';
export default function Earn() {
    const navigate = useNavigate();
    const [LFTBase,setLFTBase] = useState(null)
    const [ELFTBase,setELFTBase] = useState(null)
    const Token = useSelector(Store =>Store.token)
    useEffect(()=>{
        if(Token){
            Axios.get('/dao/userLftBase').then(res=>{
                if(res.data.data){
                    setLFTBase(res.data.data)
                }
                console.log(res,"用户LFT质押数据")
            })
            Axios.get('/dao/userElftBase').then(res=>{
                if(res.data.data){
                    setELFTBase(res.data.data)
                }
                console.log(res,"用户ELFT质押数据")
            })
        }
    },[Token])
  return (
    <div className="Earn">
        <div className="Title">
            <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
            Earn
            <span></span>
        </div>
        <div className="SubTitle">Stake LFT and eLFT to earn rewards</div>
        {
            LFTBase && 
            <div className="InfoBox">
                <div className="InfoLabel">LFT</div>
                <div className="separate"></div>
                <div className="InfoRow">
                    <span className='Label'>Price</span>
                    <span className='Value'>${LFTBase.price}</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Staked</span>
                    <span className='Value'>{LFTBase.staked} LFT</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Wallet</span>
                    <span className='Value'>{LFTBase.wallet} LFT</span>
                </div>
                <div className="separate"></div>
                <div className="InfoRow">
                    <span className='Label'>Daily Reward Rate</span>
                    <span className='Value'>{LFTBase.rewardRate}%</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Accumulated Sharing Incentives</span>
                    <span className='Value'>{LFTBase.shareAmount} LFT</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Total Released Rewards</span>
                    <span className='Value'>{LFTBase.releasedReward} LFT</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Unreleased Percentage</span>
                    <span className='Value'>{LFTBase.percentage}%</span>
                </div>
                <div className="separate"></div>
                <div className="InfoRow">
                    <span className='Label'>Total Staked</span>
                    <span className='Value'>{LFTBase.totalStaked} LFT</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Total Supply</span>
                    <span className='Value'>{LFTBase.totalSupply} LFT</span>
                </div>
                <div className="separate"></div>
                <div className='BtnRow'>
                    <div className="Btn flexCenter" onClick={()=>{navigate('/Swap?type=Buy')}}>Buy LFT</div>
                    <div className="goRecord" onClick={()=>{navigate('/PledgedRecord?type=LFT')}}>
                        {'Convert record >'}
                    </div>
                </div>
            </div>
        }
        {
            ELFTBase && 
            <div className="InfoBox mt50">
                <div className="InfoLabel">eLFT</div>
                <div className="separate"></div>
                <div className="InfoRow">
                    <span className='Label'>Price</span>
                    <span className='Value'>${ELFTBase.price}</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Staked</span>
                    <span className='Value'>{ELFTBase.staked} eLFT</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Wallet</span>
                    <span className='Value'>{ELFTBase.wallet} eLFT</span>
                </div>
                <div className="separate"></div>
                <div className="InfoRow">
                    <span className='Label'>Daily Reward Rate</span>
                    <span className='Value'>{ELFTBase.rewardRate}%</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Accumulated Sharing Incentives</span>
                    <span className='Value'>{ELFTBase.shareAmount} eLFT</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Total Released Rewards</span>
                    <span className='Value'>{ELFTBase.releasedReward} eLFT</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Unreleased Percentage</span>
                    <span className='Value'>{ELFTBase.percentage}%</span>
                </div>
                <div className="separate"></div>
                <div className="InfoRow">
                    <span className='Label'>Total Staked</span>
                    <span className='Value'>{ELFTBase.totalStaked} LFT</span>
                </div>
                <div className="InfoRow">
                    <span className='Label'>Total Supply</span>
                    <span className='Value'>{ELFTBase.totalSupply} LFT</span>
                </div>
                <div className="separate"></div>
                <div className='BtnRow'>
                <div className="Btn flexCenter" onClick={()=>{navigate('/Stake?type=ELFT')}}>Stake eLFT</div>
                <div className="Btn roseRed flexCenter" onClick={()=>{navigate('/PledgedRecord?type=ELFT')}}>Redeem eLFT</div>
                <div className="goRecord" onClick={()=>{navigate('/PledgedRecord?type=ELFT')}}>{'Record >'}</div>
                </div>
            </div>
        }
    </div>
  )
}
