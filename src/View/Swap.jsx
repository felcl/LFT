import {useNetwork} from 'wagmi'
import {useNavigate, useSearchParams,} from 'react-router-dom'
import classnames from 'classnames';
import { notification } from 'antd';
import { arbitrumGoerli} from 'wagmi/chains'
import '../assets/style/Swap.scss'
import ChangeIcon from '../assets/image/ChangeIcon.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import USDTIcon from '../assets/image/USDTIcon.png'
import chartIcon from '../assets/image/chartIcon.png'
import SlippageIcon from '../assets/image/SlippageIcon.png'
import { useEffect, useState, useMemo, useRef} from 'react';
import {useAccount, useSwitchNetwork, useConnect} from 'wagmi'
import { getReserves, getLftAllowance,getLFTBalance, getUsdtAllowance, getUSDTBalance, LftApprove, USDTApprove, subscribeLFT, getAmountOut, getAmountIn, swapBuy, swapSell} from '../web3'
import { ContractAddress, TokenConfig} from '../config'
import BigNumber from "big.js";
// import Axios from '../axios';
BigNumber.NE = -40;
BigNumber.PE = 40;

export default function Swap() {
  const navigate = useNavigate();
  const { chain, chains } = useNetwork()
  const { switchNetwork, isLoading:isLoadingSwitchNetwork } = useSwitchNetwork()
  const { connect, connectors, isLoading } = useConnect({
      chainId: arbitrumGoerli.id,
  })
  const [search] = useSearchParams();
  const {isConnected, address } = useAccount()
  const [SellOrBuy , setSellOrBuy] = useState(search.get('type') || 'Sell')
  const [ , setRate] = useState(0)
  const [reserveUsdt , setReserveUsdt] = useState(0)
  const [reserveLft , setReserveLft] = useState(0)
  const [LftNum , setLftNum] = useState('')
  const [UsdtNum , setUsdtNum] = useState('')
  const [inApprove , setInApprove] = useState(false)
  const [inSubmit , setInSubmit] = useState(false)
  const SerchKey = useRef(0)
  const [LftAllowance , setLftAllowance] = useState(new BigNumber(0))
  const [UsdtAllowance , setUsdtAllowance] = useState(new BigNumber(0))
  const [LftBalance , setLftBalance] = useState(new BigNumber(0))
  const [UsdtBalance , setUsdtBalance] = useState(new BigNumber(0))
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
    // console.log(chain,chains)
    if(isConnected && chain.id === chains[0].id){
      // subscribeLFT('Approval',(event)=>{
      //   console.log(event,"授权事件监听")
      // })
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
      getLFTBalanceFun()
      getUSDTBalanceFun()
    }
  },[isConnected,chain,address])
    // let canvasWidth = document.body.clientWidth  >= 430 ? 350 : (document.body.clientWidth - 80)
    // const [canvasWidth,setCanvasWidth] = useState(document.body.clientWidth  >= 430 ? 350 : (document.body.clientWidth - 80))
    // window.onresize = ()=>{
    //   setCanvasWidth(document.body.clientWidth  >= 430 ? 350 : (document.body.clientWidth - 80))
    // }
    const ConnectWallet = ()=>{
        if(isConnected && chain.id !== chains[0].id){
            return switchNetwork(arbitrumGoerli.id)
        }
        if(!isConnected){
            connect({ connector: connectors[1] })
        }
    }
    const getLFTBalanceFun = ()=>{
      getLFTBalance(address).then(res=>{
        console.log(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals).toString(),"LFT余额")
        setLftBalance(new BigNumber(res).div(10 ** TokenConfig.LFT.decimals))
      })
    }
    const getUSDTBalanceFun = ()=>{
      getUSDTBalance(address).then(res=>{
        console.log(new BigNumber(res).div(10 ** TokenConfig.USDT.decimals).toString(),"USDT余额")
        setUsdtBalance(new BigNumber(res).div(10 ** TokenConfig.USDT.decimals))
      })
    }
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
        return notification.warning({
            message: 'Warning',
            description:
            '请勿重复提交'
        });
      }
      setInApprove(true);
      let amount = SellOrBuy === 'Sell' ? new BigNumber(LftNum).times(10 ** TokenConfig.LFT.decimals).toString() : new BigNumber(UsdtNum).times(10 ** TokenConfig.USDT.decimals).toString();
      // eslint-disable-next-line no-unexpected-multiline
      (SellOrBuy === 'Sell' ? LftApprove : USDTApprove)(address,ContractAddress.Swap,amount).then(()=>{
        /* 查询授权结果 */
        (SellOrBuy === 'Sell' ? getLftAllowanceFun : getUsdtAllowanceFun)()
        notification.success({
            message: 'Success',
            description:
            '授权成功'
        });
      },()=>{
        notification.error({
          message: 'Error',
          description:
          '授权失败'
      });
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
      }else{
        setUsdtNum('')
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
      }else{
        setLftNum('')
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
      if(inSubmit){
        return notification.warning({
            message: 'Warning',
            description:
            '请勿重复提交'
        });
      }
      if(SellOrBuy === 'Buy'){
        if(!UsdtNum){
          return notification.warning({
              message: 'Warning',
              description:
              '请输入正确的USDT数量'
          });
        }
        if(!LftNum){
          return notification.warning({
              message: 'Warning',
              description:
              '请输入正确的LFT数量'
          });
        }
      }else{
        if(!LftNum){
          return notification.warning({
              message: 'Warning',
              description:
              '请输入正确的LFT数量'
          });
        }
        if(!UsdtNum){
          return notification.warning({
              message: 'Warning',
              description:
              '请输入正确的USDT数量'
          });
        }
      }
      if(SellOrBuy === 'Buy' && UsdtBalance.lt(UsdtNum)){
        return notification.warning({
            message: 'Warning',
            description:
            'USDT余额不足'
        });
      }
      if(SellOrBuy === 'Sell' && LftBalance.lt(LftNum)){
        return notification.warning({
            message: 'Warning',
            description:
            'LFT余额不足'
        });
      }
      setInSubmit(true)
      let USDTAmount = new BigNumber(UsdtNum).times(10 ** TokenConfig.USDT.decimals).toString()
      let LFTAmount = new BigNumber(LftNum).times(10 ** TokenConfig.LFT.decimals).toString()
      if(SellOrBuy === 'Buy'){
        console.log(address,USDTAmount,LFTAmount,Date.parse(new Date())/1000+60)
        swapBuy(address,USDTAmount,LFTAmount,Date.parse(new Date())/1000+60).then(res=>{
          console.log(res,"购买结果")
          return notification.success({
              message: 'Success',
              description:
              '兑换成功'
          });
        },()=>{
          return notification.error({
            message: 'Error',
            description:
            '兑换失败'
        });
        }).finally(()=>{
          setInSubmit(false)
        })
      }
      if(SellOrBuy === 'Sell'){
        console.log(address,USDTAmount,LFTAmount,Date.parse(new Date())/1000+60)
        swapSell(address,LFTAmount,USDTAmount,Date.parse(new Date())/1000+60).then(res=>{
          console.log(res,"售卖结果")
          return notification.success({
              message: 'Success',
              description:
              '兑换成功'
          });
        },()=>{
          return notification.error({
            message: 'Error',
            description:
            '兑换失败'
        });
        }).finally(()=>{
          setInSubmit(false)
        })
      }
    }
    const submitBtnRun = ()=>{
      /* 未链接钱包 */
      if(!address || chain.id !== chains[0].id){
        return <div className="submit flexCenter" onClick={ConnectWallet}>Connect wallet</div>
      }
      /* 未输入数量 */
      if((SellOrBuy === 'Sell' && !LftNum) || (SellOrBuy === 'Buy' && !UsdtNum)){
        return <div className="submit flexCenter Disabled" onClick={Submit}>Enter</div>
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
      return <div className="submit flexCenter" onClick={Submit}>
        {
            inSubmit && <svg viewBox="25 25 50 50">
                            <circle cx="50" cy="50" r="20"></circle>
                          </svg>
        }
        Enter
        </div>
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
