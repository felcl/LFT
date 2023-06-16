
import Canvas from '@antv/f2-react';
import { Chart, Line, Tooltip } from '@antv/f2';
import {useNavigate} from 'react-router-dom'
import classnames from 'classnames';
import '../assets/style/Swap.scss'
import ChangeIcon from '../assets/image/ChangeIcon.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import USDTIcon from '../assets/image/USDTIcon.png'
import SlippageIcon from '../assets/image/SlippageIcon.png'
import { useEffect, useState, useMem, useMemo} from 'react';
import {useAccount} from 'wagmi'
import { getReserves, getLftAllowance, getUsdtAllowance, LftApprove} from '../web3'
import { ContractAddress, TokenConfig} from '../config'
import BigNumber from "big.js";
BigNumber.NE = -40;
BigNumber.PE = 40;

export default function Swap() {
  const {isConnected, address } = useAccount()
  const [SellOrBuy , setSellOrBuy] = useState('Sell')
  const [rate , setRate] = useState(0)
  const [LftNum , setLftNum] = useState('')
  const [UsdtNum , setUsdtNum] = useState('')
  const [inApprove , setInApprove] = useState(false)
  const [LftAllowance , setLftAllowance] = useState(new BigNumber(0))
  const [UsdtAllowance , setUsdtAllowance] = useState(new BigNumber(0))
  // const isApprove = useMemo(()=>{
  //   if(SellOrBuy === 'Sell'){
  //     if(LftAllowance.gte(LftNum)){
  //       return true
  //     }
  //     return false
  //   }else{
  //     if(UsdtAllowance.gte(UsdtNum)){
  //       return true
  //     }
  //     return false
  //   }
  //   return
  // },[])
    useEffect(()=>{
      if(isConnected){
        getReserves().then(res=>{
          console.log(res)
          // new BigNumber(res._reserve0).div(res._reserve1)
          setRate(new BigNumber(res._reserve0).div(res._reserve1).div(new BigNumber(10**18).div(10**6)))
          console.log(new BigNumber(res._reserve0).div(res._reserve1).div(new BigNumber(10**18).div(10**6)).toString())
        })
        getLftAllowance(address,ContractAddress.Swap).then(res=>{
          setLftAllowance(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals))
          console.log(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals).toString(),'LFT授权额度')
        })
        getUsdtAllowance(address,ContractAddress.Swap).then(res=>{
          setUsdtAllowance(new BigNumber(res).div(10 ** TokenConfig.USDT.decimals))
          console.log(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals).toString(),'USDT授权额度')
        })
      }
    },[isConnected])
    // let canvasWidth = document.body.clientWidth  >= 430 ? 350 : (document.body.clientWidth - 80)
    const [canvasWidth,setCanvasWidth] = useState(document.body.clientWidth  >= 430 ? 350 : (document.body.clientWidth - 80))
    window.onresize = ()=>{
      setCanvasWidth(document.body.clientWidth  >= 430 ? 350 : (document.body.clientWidth - 80))
    }
    const navigate = useNavigate();
    const data = [
        {
          date: '2017-06-05',
          value: 116,
        },
        {
          date: '2017-06-06',
          value: 129,
        },
        {
          date: '2017-06-07',
          value: 135,
        },
        {
          date: '2017-06-08',
          value: 86,
        },
        {
          date: '2017-06-09',
          value: 73,
        },
        {
          date: '2017-06-10',
          value: 85,
        },
        {
          date: '2017-06-11',
          value: 73,
        },
        {
          date: '2017-06-12',
          value: 68,
        },
        {
          date: '2017-06-13',
          value: 92,
        },
        {
          date: '2017-06-14',
          value: 130,
        },
        {
          date: '2017-06-15',
          value: 245,
        },
        {
          date: '2017-06-16',
          value: 139,
        },
        {
          date: '2017-06-17',
          value: 115,
        },
        {
          date: '2017-06-18',
          value: 111,
        },
        {
          date: '2017-06-19',
          value: 309,
        },
        {
          date: '2017-06-20',
          value: 206,
        },
        {
          date: '2017-06-21',
          value: 137,
        },
        {
          date: '2017-06-22',
          value: 128,
        },
        {
          date: '2017-06-23',
          value: 85,
        },
        {
          date: '2017-06-24',
          value: 94,
        },
        {
          date: '2017-06-25',
          value: 71,
        },
        {
          date: '2017-06-26',
          value: 106,
        },
        {
          date: '2017-06-27',
          value: 84,
        },
        {
          date: '2017-06-28',
          value: 93,
        },
        {
          date: '2017-06-29',
          value: 85,
        },
        {
          date: '2017-06-30',
          value: 73,
        },
        {
          date: '2017-07-01',
          value: 83,
        },
        {
          date: '2017-07-02',
          value: 125,
        },
        {
          date: '2017-07-03',
          value: 107,
        },
        {
          date: '2017-07-04',
          value: 82,
        },
        {
          date: '2017-07-05',
          value: 44,
        },
        {
          date: '2017-07-06',
          value: 72,
        },
        {
          date: '2017-07-07',
          value: 106,
        },
        {
          date: '2017-07-08',
          value: 107,
        },
        {
          date: '2017-07-09',
          value: 66,
        },
        {
          date: '2017-07-10',
          value: 91,
        },
        {
          date: '2017-07-11',
          value: 92,
        },
        {
          date: '2017-07-12',
          value: 113,
        },
        {
          date: '2017-07-13',
          value: 107,
        },
        {
          date: '2017-07-14',
          value: 131,
        },
        {
          date: '2017-07-15',
          value: 111,
        },
        {
          date: '2017-07-16',
          value: 64,
        },
        {
          date: '2017-07-17',
          value: 69,
        },
        {
          date: '2017-07-18',
          value: 88,
        },
        {
          date: '2017-07-19',
          value: 77,
        },
        {
          date: '2017-07-20',
          value: 83,
        },
        {
          date: '2017-07-21',
          value: 111,
        },
        {
          date: '2017-07-22',
          value: 57,
        },
        {
          date: '2017-07-23',
          value: 55,
        },
        {
          date: '2017-07-24',
          value: 60,
        },
    ];
    const ApproveFun = ()=>{
      setInApprove(true)
      LftApprove(address,ContractAddress.Swap,100).then(res=>{
        console.log(res,"授权结果")
      }).finally(()=>{
        setInApprove(false)
      })
    }
    const changeSellOrBuy = ()=>{
      if(SellOrBuy == 'Sell'){
        setSellOrBuy('Buy')
      }else{
        setSellOrBuy('Sell')
      }
    }
    const putLftNUm = (e)=>{
      console.log(changeNumPut(e.target.value))
      let putVal = changeNumPut(e.target.value)
      setLftNum(putVal)
      if(putVal){
        setUsdtNum(new BigNumber(putVal).div(rate))
      }
    }
    const putUsdtNUm = (e)=>{
      console.log(changeNumPut(e.target.value))
      let putVal = changeNumPut(e.target.value)
      setUsdtNum(putVal)
      if(putVal){
        setLftNum(new BigNumber(putVal).times(rate))
      }
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
    
    return (
        <div className='Swap'>
            <div className="Title">Swap</div>
            <div className="SwapBox">
                <div className="Tabs">
                    <div className="tabItem tabItemActive" onClick={()=>{setSellOrBuy('Sell')}}>Swap</div>
                    <div className="tabItem" onClick={()=>{setSellOrBuy('Buy')}}>Buy</div>
                    <div className='SlippageIcon' onClick={()=>{navigate('/Slippage')}}>
                      <img src={SlippageIcon} alt="" />
                    </div>
                </div>
                <div className={classnames(['putMain'])}>
                    <div className={classnames(['putRow', SellOrBuy === 'Sell' ? 'top':'bottom'])}>
                        <input type="text" value={LftNum} onInput={(e)=>{putLftNUm(e)}} />
                        <div className="token">
                            <img src={LFTIcon} alt="" />
                            LFT
                        </div>
                    </div>
                    <img className={classnames(['ChangeIcon',{ChangeIconReverse:SellOrBuy === 'Buy'}])} src={ChangeIcon} onClick={changeSellOrBuy} alt="" />
                    <div  className={classnames(['putRow', SellOrBuy === 'Sell' ? 'bottom':'top'])}>
                        <input type="text" value={UsdtNum} onInput={(e)=>{putUsdtNUm(e)}} />
                        <div className="token">
                            <img src={USDTIcon} alt="" />
                            USDT
                        </div>
                    </div>
                </div>
                <div className="swapInfo">
                    <div className="increaseRow">
                        <div className="increaseText">1 ETH = 30.3079 AAVE ($1,866.92)</div>
                        <Canvas  width={canvasWidth} height={canvasWidth * 0.21}>
                            <Chart data={data}>
                                <Line x="date" y="value" />
                                <Tooltip />
                            </Chart>
                        </Canvas>
                        {/* <canvas id="container" width="350" height="80"></canvas> */}
                    </div>
                    <div className="InfoRow">
                        <div className="label">Network fee</div>
                        <div className="value">~$8.02</div>
                    </div>
                    <div className="InfoRow">
                        <div className="label">Price Impact</div>
                        <div className="value">-0.05%</div>
                    </div>
                    <div className="InfoRow">
                        <div className="label">Minimum output</div>
                        <div className="value">0.000501389 ETH</div>
                    </div>
                    <div className="InfoRow">
                        <div className="label">Expected output</div>
                        <div className="value">0.000526458 ETH</div>
                    </div>
                    <div className="InfoRow borderTop">
                        <div className="label">Order routing</div>
                        <div className="value">LFTswap API</div>
                    </div>
                </div>
                <div className="submit flexCenter" onClick={ApproveFun}>
                  <svg viewBox="25 25 50 50" v-if="inSVIPAllowance">
                    <circle cx="50" cy="50" r="20"></circle>
                  </svg>
                  Approve
                </div>
                {/* <div className="submit flexCenter">Connect wallet</div> */}
            </div>
            <div className="goRecord" onClick={()=>{navigate('/SwapRecord')}}>
                {'Swap record >'}
            </div>
        </div>
    )
}
