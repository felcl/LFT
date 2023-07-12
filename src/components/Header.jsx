import '../assets/css/componentsCss/Header.scss'
import HeaderLogo from '../assets/img/HeaderLogo.png'
import ArbiturmIcon from '../assets/img/ArbiturmIcon.png'
import arrowDown from '../assets/img/arrowDown.png'
import LangIcon from '../assets/img/LangIcon.png'
export default function Header() {
  return (
    <div className="Header">
        <div className="HeaderContent">
            <div className="HeaderLeft">
                <img src={HeaderLogo} alt="" />
                <div className="Menu">
                    <div className="MenuItem">Swap</div>
                    <div className="MenuItem">Stake</div>
                    <div className="MenuItem">Earn</div>
                </div>
            </div>
            <div className="HeaderRight">
                <div className="chain">
                    <img src={ArbiturmIcon} alt="" />
                    <span>Arbiturm</span>
                    <img src={arrowDown} alt="" />
                </div>
                <div className="connect flexCenter">Connect wallet</div>
                <img src={LangIcon} alt="" />
            </div>
        </div>
    </div>
  )
}
