import { useState } from 'react';
import { Drawer } from 'antd';
import '../assets/style/componentsStyle/Header.scss'
import bannerLogo from '../assets/image/bannerLogo.png'
import HomeIcon from '../assets/image/HomeIcon.png'
import HomeIconBlack from '../assets/image/HomeIconBlack.png'
import SwapIcon from '../assets/image/SwapIcon.png'
import SwapIconBlack from '../assets/image/SwapIconBlack.png'
import WalletIcon from '../assets/image/WalletIcon.png'
import WalletIconBlack from '../assets/image/WalletIconBlack.png'
import ConvertIcon from '../assets/image/ConvertIcon.png'
import ConvertIconBlack from '../assets/image/ConvertIconBlack.png'
import LangIcon from '../assets/image/LangIcon.png'
import MenuIcon from '../assets/image/MenuIcon.png'
import {useNavigate ,useLocation} from 'react-router-dom'

export default function Header() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };
    const MenuClass = (path) => {
        if(location.pathname === path){
            return 'MenuItem activeMenuItem'
        }
        if(location.pathname !=='/'){
            return 'MenuItem BlackMenuItem'
        }
        return 'MenuItem'
    }
    return (
        <>
        <div className="Header">
            <div className="Menu">
                <div className={MenuClass('/')} onClick={()=>{navigate('/')}}><img src={location.pathname ==='/' ? HomeIcon:HomeIconBlack} alt="" />Home</div>
                <div className={MenuClass('/Swap')} onClick={()=>{navigate('/Swap')}}><img src={location.pathname ==='/' ? SwapIcon : SwapIconBlack} alt="" />Swap</div>
                <div className={MenuClass('/Convert')} onClick={()=>{navigate('/Convert')}}><img src={location.pathname ==='/' ? ConvertIcon : ConvertIconBlack} alt="" />Convert</div> 
                <div className={MenuClass('/Wallet')} onClick={()=>{navigate('/Wallet')}}><img src={location.pathname ==='/' ? WalletIcon : WalletIconBlack } alt="" />Wallet</div> 
            </div>
            <div className="HeaderRight">
                <div className='connect flexCenter'>Connect wallet</div>
                <div className="Lang">
                    <img src={LangIcon} alt="" />
                </div>
            </div>
            <img className="MenuIcon" onClick={showDrawer} src={MenuIcon} alt="" />
        </div>
        <Drawer placement="right" width="178" onClose={onClose} closable={false} open={open} rootClassName="DrawerBodyRoot" className="DrawerBody">
            <img src={bannerLogo} alt="" />
            <div className='DrawerMenuItem' onClick={()=>{navigate('/')}}>Home</div>
            <div className='DrawerMenuItem' onClick={()=>{navigate('/Swap')}}>Swap</div>
            <div className='DrawerMenuItem' onClick={()=>{navigate('/Convert')}}>Convert</div>
            <div className='DrawerMenuItem' onClick={()=>{navigate('/Wallet')}}>Wallet</div>
        </Drawer>
        </>
    )
}
