import '../assets/css/componentsCss/Header.scss'
import HeaderLogo from '../assets/img/HeaderLogo.png'
import ArbiturmIcon from '../assets/img/ArbiturmIcon.png'
import arrowDown from '../assets/img/arrowDown.png'
import LangIcon from '../assets/img/LangIcon.png'
import { useNavigate } from 'react-router-dom'
export default function Header() {
    const navigate = useNavigate();
    const goPath = (path)=>{
        navigate(path)
    }
  return (
    <div className="Header">
        <div className="HeaderContent">
            <div className="HeaderLeft">
                <img src={HeaderLogo} alt="" />
                <div className="Menu">
                    <div className="MenuItem" onClick={()=>{goPath('/Swap')}}>Swap</div>
                    <div className="MenuItem" onClick={()=>{goPath('/Stake')}}>Stake</div>
                    <div className="MenuItem" onClick={()=>{goPath('/Earn')}}>Earn</div>
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
