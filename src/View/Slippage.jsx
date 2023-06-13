import '../assets/style/Slippage.scss'
import classnames from 'classnames';
import { Switch } from 'antd';
import { useNavigate} from 'react-router-dom'
import JTReturn from '../assets/image/JTReturn.png'
import { useState, useRef} from 'react';
export default function Slippage() {
    const navigate = useNavigate();
    const [ActiveTabIndex , setActiveTabIndex] = useState(-1)
    const ActiveTabRef = useRef()
    const changeTab = (event,index)=>{
        // console.log(event.target)
        // console.log(event.target.clientWidth)
        // console.log(event.target.offsetLeft)
        // console.log(ActiveTabRef.current)
        setActiveTabIndex(index)
        ActiveTabRef.current.style.width = event.target.clientWidth + 'px'
        ActiveTabRef.current.style.height = event.target.clientHeight + 'px'
        ActiveTabRef.current.style.left = event.target.offsetLeft + 'px'
    }
  return (
    <div className="Slippage">
        <div className="Title">Swap</div>
        <div className="SlippageBox">
            <div className="SlippageHeader">
                <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
                <span className='HeaderTitle'>Advanced Settings</span>
                <span className='Reset'>Reset</span>
            </div>
            <div className="SlippageLabel">Slippage Tolerance</div>
            <div className="SlippageSubLabel">Yourtransaction will revert if the price changes unfavorably by <br/>more than this percentage when current route is aggregator.</div>
            <div className='percentageRow'>
                <div className="percentageTab">
                    <div className={classnames(['TabItem','flexCenter'])} onClick={(event)=>{changeTab(event,0)}}>0.3%</div>
                    <div className={classnames(['TabItem','flexCenter'])} onClick={(event)=>{changeTab(event,1)}}>1%</div>
                    <div className={classnames(['TabItem','flexCenter'])} onClick={(event)=>{changeTab(event,2)}}>3%</div>
                    <div className="ActiveTab" ref={ActiveTabRef}></div>
                </div>
                <div className="percentagePut flexCenter">
                    <input type="text" />
                    %
                </div>
            </div>
            <div className="switchLabel">LFT swap receive address </div>
            <Switch defaultChecked className='percentageSwitch' />
        </div>
    </div>
  )
}
