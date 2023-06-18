import '../assets/style/Earn.scss'
import {useNavigate} from 'react-router-dom'
import JTReturn from '../assets/image/JTReturn.png'
export default function Earn() {
    const navigate = useNavigate();
  return (
    <div className="Earn">
        <div className="Title">
            <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
            Earn
            <span></span>
        </div>
        <div className="SubTitle">Stake LFT and eLFT to earn rewards</div>
        <div className="InfoBox">
            <div className="InfoLabel">LFT</div>
            <div className="separate"></div>
            <div className="InfoRow">
                <span className='Label'>Price</span>
                <span className='Value'>$1.05</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Staked</span>
                <span className='Value'>10.00 LFT</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Wallet</span>
                <span className='Value'>10.00 LFT</span>
            </div>
            <div className="separate"></div>
            <div className="InfoRow">
                <span className='Label'>Daily Reward Rate</span>
                <span className='Value'>1.1%</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Accumulated Sharing Incentives</span>
                <span className='Value'>34.52 eLFT</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Total Released Rewards</span>
                <span className='Value'>3.12 eLFT</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Unreleased Percentage</span>
                <span className='Value'>72.56%</span>
            </div>
            <div className="separate"></div>
            <div className="InfoRow">
                <span className='Label'>Total Staked</span>
                <span className='Value'>373,232,212 LFT</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Total Supply</span>
                <span className='Value'>543,232,122 LFT</span>
            </div>
            <div className="separate"></div>
            <div className='BtnRow'>
                <div className="Btn flexCenter">Buy LFT</div>
            </div>
        </div>
        <div className="InfoBox mt50">
            <div className="InfoLabel">LFT</div>
            <div className="separate"></div>
            <div className="InfoRow">
                <span className='Label'>Price</span>
                <span className='Value'>$1.05</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Staked</span>
                <span className='Value'>10.00 LFT</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Wallet</span>
                <span className='Value'>10.00 LFT</span>
            </div>
            <div className="separate"></div>
            <div className="InfoRow">
                <span className='Label'>Daily Reward Rate</span>
                <span className='Value'>1.1%</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Accumulated Sharing Incentives</span>
                <span className='Value'>34.52 eLFT</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Total Released Rewards</span>
                <span className='Value'>3.12 eLFT</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Unreleased Percentage</span>
                <span className='Value'>72.56%</span>
            </div>
            <div className="separate"></div>
            <div className="InfoRow">
                <span className='Label'>Total Staked</span>
                <span className='Value'>373,232,212 LFT</span>
            </div>
            <div className="InfoRow">
                <span className='Label'>Total Supply</span>
                <span className='Value'>543,232,122 LFT</span>
            </div>
            <div className="separate"></div>
            <div className='BtnRow'>
            <div className="Btn flexCenter">Buy LFT</div>
            <div className="Btn roseRed flexCenter">Redeem eLFT</div>
            </div>
        </div>
    </div>
  )
}
