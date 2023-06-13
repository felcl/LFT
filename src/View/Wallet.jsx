import '../assets/style/Wallet.scss'
import {useNavigate} from 'react-router-dom'
import copyIcon from '../assets/image/copyIcon.png'
import VipIcon from '../assets/image/VipIcon.png'
import JTRight from '../assets/image/JTRight.png'
export default function Wallet() {
    const navigate = useNavigate();
  return (
    <div className="Wallet">
        <div className="Title">Wallet</div>
        <div className="UserInfo">
            <div className="Info">
                <div className="address">
                    <div className="userHeaderBox">
                        <div className="userHeader"></div>
                    </div>
                    <span className="long">0x3Bd8CA9023897224b01fE25b33137b67A89ec70F</span>
                    <span className="short">0x3Bd8****9ec70F</span>
                    <img className='copyIcon' src={copyIcon} alt="" />
                    <img className='VipIcon' src={VipIcon} alt="" />
                </div>
                <div className="inviteLink">
                    <div>
                        <span className="long">http://sadfs.dadsf.com/sdadsf</span>
                        <span className="short">http://sa****dadsf</span>
                    </div>
                    <div className="Withdraw flexCenter">
                        Withdraw
                    </div>
                </div>
            </div>
            <div className="TotalInfo">
                <div className="TotalItem">
                    <div className="TotalLabel">USDT balance</div>
                    <div className="TotalValue">1,210,020.002</div>
                </div>
                <div className="TotalItem">
                    <div className="TotalLabel">LFT balance</div>
                    <div className="TotalValue">1,210,020.002</div>
                </div>
                <div className="TotalItem">
                    <div className="TotalLabel">SLFT balance</div>
                    <div className="TotalValue">1,210,020.002</div>
                </div>
            </div>
        </div>
        <div className="pledgeFee">
            <div className="pledgeFeeItem">
                <div className="pledgeFeeItemLabel">Proceeds of pledge</div>
                <div className="pledgeFeeItemValue">1,210,020.002</div>
            </div>
            <div className="separate"></div>
            <div className="pledgeFeeItem">
                <div className="pledgeFeeItemLabel">Fee income</div>
                <div className="pledgeFeeItemValue">1,210,020.002</div>
            </div>
        </div>
        <div className="pledged">
            <span>Amount pledged</span>
            <div className="pledgedGo">
                <div className="pledgedLFT" onClick={()=>{navigate('/PledgedRecord?type=LFT')}}>
                LFT
                <img src={JTRight} alt="" />
                </div>
                <div className="pledgedELFT" onClick={()=>{navigate('/PledgedRecord?type=ELFT')}}>
                ELFT
                <img src={JTRight} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
