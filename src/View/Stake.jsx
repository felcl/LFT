import '../assets/style/Stake.scss'
import { Popover} from 'antd';
import {useNavigate} from 'react-router-dom'
import JTReturn from '../assets/image/JTReturn.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import JTDown from '../assets/image/JTDown.png'
export default function Stake() {
    const navigate = useNavigate();
    const content = (
        <div className='PopoverContent'>
            <div className='SelItem'>
                <img src={LFTIcon} alt="" />ELFT
            </div>
        </div>
    );
  return (
    <div className='Stake'>
        <div className="Title">
            <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
            Earn
            <span></span>
        </div>
        <div className="StakeBox">
            <div className="PutAmount">
                <input type="text" placeholder='Please enter your amount' />
                <Popover content={content} placement="bottom" overlayClassName="StakePopover" trigger="click">
                    <div className="selToken">
                        <img src={LFTIcon} alt="" />
                        LFT
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
            <div className="submit flexCenter">Confirm</div>
        </div>
        <div className="goRecord">
            {'Stake  record >'}
        </div>
    </div>
  )
}
