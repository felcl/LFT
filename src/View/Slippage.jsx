import '../assets/style/Slippage.scss'
import { Switch } from 'antd';
import JTReturn from '../assets/image/JTReturn.png'
export default function Slippage() {
  return (
    <div className="Slippage">
        <div className="Title">Swap</div>
        <div className="SlippageBox">
            <div className="SlippageHeader">
                <img src={JTReturn} alt="" />
                <span className='HeaderTitle'>Advanced Settings</span>
                <span className='Reset'>Reset</span>
            </div>
            <div className="SlippageLabel">Slippage Tolerance</div>
            <div className="SlippageSubLabel">Yourtransaction will revert if the price changes unfavorably by <br/>more than this percentage when current route is aggregator.</div>
            <div className='percentageRow'>
                <div className="percentageTab">
                    <div className="TabItem flexCenter">0.3%</div>
                    <div className="TabItem flexCenter ActiveTabItem">1%</div>
                    <div className="TabItem flexCenter">3%</div>
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
