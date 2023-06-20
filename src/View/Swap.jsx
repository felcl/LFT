
import Canvas from '@antv/f2-react';
import { Chart, Line, Tooltip } from '@antv/f2';
import {useNavigate, useSearchParams} from 'react-router-dom'
import classnames from 'classnames';
import '../assets/style/Swap.scss'
import ChangeIcon from '../assets/image/ChangeIcon.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import USDTIcon from '../assets/image/USDTIcon.png'
import chartIcon from '../assets/image/chartIcon.png'
import SlippageIcon from '../assets/image/SlippageIcon.png'
import { useEffect, useState, useMemo, useRef} from 'react';
import {useAccount,} from 'wagmi'
import { getReserves, getLftAllowance, getUsdtAllowance, LftApprove, USDTApprove, subscribeLFT, getAmountOut, getAmountIn, swapBuy, swapSell} from '../web3'
import { ContractAddress, TokenConfig} from '../config'
import BigNumber from "big.js";
BigNumber.NE = -40;
BigNumber.PE = 40;

export default function Swap() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const {isConnected, address } = useAccount()
  const [SellOrBuy , setSellOrBuy] = useState(search.get('type') || 'Sell')
  const [ , setRate] = useState(0)
  const [reserveUsdt , setReserveUsdt] = useState(0)
  const [reserveLft , setReserveLft] = useState(0)
  const [LftNum , setLftNum] = useState('')
  const [UsdtNum , setUsdtNum] = useState('')
  const [inApprove , setInApprove] = useState(false)
  const SerchKey = useRef(0)
  const [LftAllowance , setLftAllowance] = useState(new BigNumber(0))
  const [UsdtAllowance , setUsdtAllowance] = useState(new BigNumber(0))
  /**
   * true 已授权
   * false 未授权
   */
  const isApprove = useMemo(()=>{
    if(SellOrBuy === 'Sell' && LftNum && LftAllowance.gte(LftNum)){
      return true
    }
    if(SellOrBuy === 'Buy' && UsdtNum && UsdtAllowance.gte(UsdtNum)){
      return true
    }
    return false
  },[SellOrBuy,LftAllowance,UsdtAllowance,LftNum,UsdtNum])
    useEffect(()=>{
      if(isConnected){
        subscribeLFT('Approval',(event)=>{
          console.log(event,"授权事件监听")
        })
        getReserves().then(res=>{
          console.log(res)
          setReserveUsdt(res._reserve1)
          setReserveLft(res._reserve0)
          // new BigNumber(res._reserve0).div(res._reserve1)
          setRate(new BigNumber(res._reserve0).div(res._reserve1).div(new BigNumber(10**18).div(10**6)))
          console.log(new BigNumber(res._reserve0).div(res._reserve1).div(new BigNumber(10**18).div(10**6)).toString())
        })
        getLftAllowanceFun()
        getUsdtAllowanceFun()
      }
    },[isConnected])
    // let canvasWidth = document.body.clientWidth  >= 430 ? 350 : (document.body.clientWidth - 80)
    const [canvasWidth,setCanvasWidth] = useState(document.body.clientWidth  >= 430 ? 350 : (document.body.clientWidth - 80))
    window.onresize = ()=>{
      setCanvasWidth(document.body.clientWidth  >= 430 ? 350 : (document.body.clientWidth - 80))
    }
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

    const getLftAllowanceFun = ()=>{
      getLftAllowance(address,ContractAddress.Swap).then(res=>{
        setLftAllowance(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals))
        console.log(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals).toString(),'LFT授权额度')
      })
    }
    const getUsdtAllowanceFun = ()=>{
      getUsdtAllowance(address,ContractAddress.Swap).then(res=>{
        setUsdtAllowance(new BigNumber(res).div(10 ** TokenConfig.USDT.decimals))
        console.log(new BigNumber(res).div(10 ** TokenConfig.USDT.decimals).toString(),'USDT授权额度')
      })
    }
    const ApproveFun = ()=>{
      if(inApprove){
        return console.log('请勿重复提交')
      }
      setInApprove(true);
      let amount = SellOrBuy === 'Sell' ? new BigNumber(LftNum).times(10 ** TokenConfig.LFT.decimals).toString() : new BigNumber(UsdtNum).times(10 ** TokenConfig.USDT.decimals).toString();
      // eslint-disable-next-line no-unexpected-multiline
      (SellOrBuy === 'Sell' ? LftApprove : USDTApprove)(address,ContractAddress.Swap,amount).then(()=>{
        /* 查询授权结果 */
        (SellOrBuy === 'Sell' ? getLftAllowanceFun : getUsdtAllowanceFun)()
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
        let amount = new BigNumber(putVal).times(10 ** TokenConfig.LFT.decimals).toString()
        let key = SerchKey.current + 1
        SerchKey.current = key
        if(SellOrBuy === 'Buy'){
          getAmountIn(amount,reserveUsdt,reserveLft).then(res=>{
            if(key === SerchKey.current){
              setUsdtNum(new BigNumber(res).div(10 ** TokenConfig.USDT.decimals).toString())
              console.log(new BigNumber(res).div(10 ** TokenConfig.USDT.decimals).toString(),"最小输入量")
            }
          })
        }
        if(SellOrBuy === 'Sell'){
          getAmountOut(amount,reserveLft,reserveUsdt).then(res=>{
            if(key === SerchKey.current){
              setUsdtNum(new BigNumber(res).div(10 ** TokenConfig.USDT.decimals).toString())
              console.log(new BigNumber(res).div(10 ** TokenConfig.USDT.decimals).toString(),"最小输出量")
            }
          })
        }
      }
    }
    const putUsdtNUm = (e)=>{
      console.log(changeNumPut(e.target.value))
      let putVal = changeNumPut(e.target.value)
      setUsdtNum(putVal)
      if(putVal){
        let amount = new BigNumber(putVal).times(10 ** TokenConfig.USDT.decimals).toString()
        let key = SerchKey.current + 1
        SerchKey.current = key
        if(SellOrBuy === 'Buy'){
          getAmountOut(amount,reserveUsdt,reserveLft).then(res=>{
            if(key === SerchKey.current){
              setLftNum(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals).toString())
              console.log(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals).toString(),"最小输出量")
            }
          })
        }
        if(SellOrBuy === 'Sell'){
          getAmountIn(amount,reserveLft,reserveUsdt).then(res=>{
            if(key === SerchKey.current){
              setLftNum(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals).toString())
              console.log(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals).toString(),"最小输入量")
            }
          })
        }
        // setLftNum(new BigNumber(putVal).times(rate))
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
    const Submit = ()=>{
      let USDTAmount = new BigNumber(UsdtNum).times(10 ** TokenConfig.USDT.decimals).toString()
      let LFTAmount = new BigNumber(LftNum).times(10 ** TokenConfig.LFT.decimals).toString()
      if(SellOrBuy === 'Buy'){
        console.log(address,USDTAmount,LFTAmount,Date.parse(new Date())/1000+60)
        swapBuy(address,USDTAmount,LFTAmount,Date.parse(new Date())/1000+60).then(res=>{
          console.log(res,"购买结果")
        })
      }
      if(SellOrBuy === 'Sell'){
        console.log(address,USDTAmount,LFTAmount,Date.parse(new Date())/1000+60)
        swapSell(address,LFTAmount,USDTAmount,Date.parse(new Date())/1000+60).then(res=>{
          console.log(res,"售卖结果")
        })
      }
    }
    const submitBtnRun = ()=>{
      /* 未链接钱包 */
      if(!address){
        return <div className="submit flexCenter" >Connect wallet</div>
      }
      /* 未输入数量 */
      if((SellOrBuy === 'Sell' && !LftNum) || (SellOrBuy === 'Buy' && !UsdtNum)){
        return <div className="submit flexCenter Disabled" >Enter</div>
      }
      /* 未授权 */
      if(!isApprove){
        return <div className="submit flexCenter" onClick={ApproveFun}>
          {
            inApprove && <svg viewBox="25 25 50 50">
                            <circle cx="50" cy="50" r="20"></circle>
                          </svg>
          }
          Approve
        </div>
      }
      /* 验证通过发起交易 */
      return <div className="submit flexCenter" onClick={Submit}>Enter</div>
    }
    return (
        <div className='Swap'>
            <div className="Title">Swap</div>
            <div className="SwapBox">
                <div className="Tabs">
                    {/* <div className="tabItem tabItemActive" onClick={()=>{setSellOrBuy('Sell')}}>Swap</div>
                    <div className="tabItem" onClick={()=>{setSellOrBuy('Buy')}}>Buy</div> */}
                    <div className='SlippageIcon' onClick={()=>{navigate('/SwapChart')}}>
                      <img src={chartIcon} alt="" />
                    </div>
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
                    {/* <div className="increaseRow">
                        <div className="increaseText">1 ETH = 30.3079 AAVE ($1,866.92)</div>
                        <Canvas  width={canvasWidth} height={canvasWidth * 0.21}>
                            <Chart data={data}>
                                <Line x="date" y="value" />
                                <Tooltip />
                            </Chart>
                        </Canvas>
                    </div> */}
                    <div className="InfoRow">
                        <div className="label">Exchange Route</div>
                        <div className="value">-</div>
                    </div>
                    <div className="InfoRow">
                        <div className="label">Reference price</div>
                        <div className="value">-</div>
                    </div>
                    <div className="InfoRow">
                        <div className="label">Fee</div>
                        <div className="value">-</div>
                    </div>
                    <div className="InfoRow">
                        <div className="label">Expected output</div>
                        <div className="value">-</div>
                    </div>
                    {/* <div className="InfoRow borderTop">
                        <div className="label">Order routing</div>
                        <div className="value">LFTswap API</div>
                    </div> */}
                </div>
                {
                  submitBtnRun()
                }
            </div>
            <div className="goRecord" onClick={()=>{navigate('/SwapRecord')}}>
                {'Swap record >'}
            </div>
        </div>
    )
}
