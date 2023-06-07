import '../assets/style/Wallet.scss'
import copyIcon from '../assets/image/copyIcon.png'
import VipIcon from '../assets/image/VipIcon.png'
export default function Wallet() {
  return (
    <div className="Wallet">
        <div className="Title">Wallet</div>
        <div className="UserInfo">
            <div className="Info">
                <div className="address">
                    <div className="userHeaderBox">
                        <div className="userHeader"></div>
                    </div>
                    <span>0x3Bd8CA9023897224b01fE25b33137b67A89ec70F</span>
                    <img className='copyIcon' src={copyIcon} alt="" />
                    <img className='VipIcon' src={VipIcon} alt="" />
                </div>
                <div className="inviteLink">
                    <div>
                        <span>http://sadfs.dadsf.com/sdadsf</span>
                    </div>
                    <div className="Withdraw flexCenter">
                        Withdraw
                    </div>
                </div>
            </div>
            <div className="TotalInfo">
                
            </div>
        </div>
    </div>
  )
}
