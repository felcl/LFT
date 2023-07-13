import '../assets/css/componentsCss/Header.scss'
import HeaderLogo from '../assets/img/HeaderLogo.png'
import ArbiturmIcon from '../assets/img/ArbiturmIcon.png'
import arrowDown from '../assets/img/arrowDown.png'
import LangIcon from '../assets/img/LangIcon.png'
import {useNavigate ,useLocation} from 'react-router-dom'
export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const goPath = (path)=>{
        navigate(path)
    }
    const MenuClass = (path) => {
        if(location.pathname === path){
            return 'MenuItem activeMenuItem'
        }
        return 'MenuItem'
    }
  return (
    <div className="Header">
        <div className="HeaderContent">
            <div className="HeaderLeft">
                <img src={HeaderLogo} alt="" />
                <div className="Menu">
                    <div className={MenuClass('/Swap')} onClick={()=>{goPath('/Swap')}}>Swap</div>
                    <div className={MenuClass('/Stake')} onClick={()=>{goPath('/Stake')}}>Stake</div>
                    <div className={MenuClass('/Earn')} onClick={()=>{goPath('/Earn')}}>Earn</div>
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
