import { useState } from 'react';
import { Drawer, Popover } from 'antd';
import { useAccount, useConnect, useDisconnect, useSwitchNetwork} from 'wagmi'
import { arbitrum} from 'wagmi/chains'
import {AddrHandle} from '../utils/tool'
import '../assets/style/componentsStyle/Header.scss'
import bannerLogo from '../assets/image/bannerLogo.png'
import HomeIcon from '../assets/image/HomeIcon.png'
import HomeIconBlack from '../assets/image/HomeIconBlack.png'
import HomeIconOrange from '../assets/image/HomeIconOrange.png'
import SwapIcon from '../assets/image/SwapIcon.png'
import SwapIconBlack from '../assets/image/SwapIconBlack.png'
import SwapIconOrange from '../assets/image/SwapIconOrange.png'
import WalletIcon from '../assets/image/WalletIcon.png'
import WalletIconBlack from '../assets/image/WalletIconBlack.png'
import WalletIconOrange from '../assets/image/WalletIconOrange.png'
import ConvertIcon from '../assets/image/ConvertIcon.png'
import ConvertIconBlack from '../assets/image/ConvertIconBlack.png'
import ConvertIconOrange from '../assets/image/ConvertIconOrange.png'
import AboutIcon from '../assets/image/AboutIcon.png'
import AboutIconBlack from '../assets/image/AboutIconBlack.png'
import AboutIconOrange from '../assets/image/AboutIconOrange.png'
import LangIcon from '../assets/image/LangIcon.png'
import MenuIconImg from '../assets/image/MenuIcon.png'
import blackMenuIcon from '../assets/image/blackMenuIcon.png'
import DocumentationIcon from '../assets/image/DocumentationIcon.png'
import TeamIcon from '../assets/image/TeamIcon.png'
import {useNavigate ,useLocation} from 'react-router-dom'


export default function Header() {
    const { address, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { chains, switchNetwork  } = useSwitchNetwork()
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const goPath = (path)=>{
        setOpen(false)
        navigate(path)
    }
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
            return path ? 'MenuItem BlackMenuItem' : 'HoverMenuItem BlackMenuItem'
        }
        if(!path){
            return 'HoverMenuItem'
        }
        return 'MenuItem'
    }
    const MenuIcon = (path,Icon,BlackIcon,OrangeIcon) => {
        if(location.pathname === path){
            return OrangeIcon
        }
        if(location.pathname !=='/'){
            return BlackIcon
        }
        return Icon
    }
    const ConnectWallet = ()=>{
        console.log(chains, switchNetwork,arbitrum)
        if(isConnected){
            return
        }
        // console.log(switchNetwork(arbitrum.id))
        // console.log(chains, switchNetwork)
        connect({ connector: connectors[1] })
    }
    const content = (
        <div className='AboutPopoverContent'>
            <div className='SelItem'>
                <img src={TeamIcon} alt="" />
                Team
            </div>
            <div className='SelItem'>
                <img src={DocumentationIcon} alt="" />
                Documentation
            </div>
        </div>
    );
    return (
        <>
        <div className="Header">
            <div className="Menu">
                <div className={MenuClass('/')} onClick={()=>{goPath('/')}}><img src={MenuIcon('/',HomeIcon,HomeIconBlack,HomeIconOrange)} alt="" />Home</div>
                <div className={MenuClass('/Swap')} onClick={()=>{goPath('/Swap')}}><img src={MenuIcon('/Swap',SwapIcon,SwapIconBlack,SwapIconOrange)} alt="" />Swap</div>
                <div className={MenuClass('/Convert')} onClick={()=>{goPath('/Convert')}}><img src={MenuIcon('/Convert',ConvertIcon,ConvertIconBlack,ConvertIconOrange)} alt="" />Convert</div> 
                <div className={MenuClass('/Wallet')} onClick={()=>{goPath('/Wallet')}}><img src={MenuIcon('/Wallet',WalletIcon,WalletIconBlack,WalletIconOrange)} alt="" />Wallet</div>
                {/* <div className={MenuClass()}><img src={MenuIcon(undefined,AboutIcon,AboutIconBlack,AboutIconOrange)} alt="" />About</div> */}
                <Popover content={content} placement="bottom"  overlayClassName="AboutPopover" getPopupContainer={() => document.getElementById('About')}>
                    <div className={MenuClass()} id='About'><img src={MenuIcon(undefined,AboutIcon,AboutIconBlack,AboutIconOrange)} alt="" />About</div>
                </Popover>
            </div>
            <div className="HeaderRight">
                <div className='connect flexCenter' onClick={ConnectWallet}>
                {
                    isLoading && <svg viewBox="25 25 50 50">
                        <circle cx="50" cy="50" r="20"></circle>
                    </svg>
                }
                { isConnected ? AddrHandle(address) : 'Connect wallet'}
                </div>
                <div className="Lang">
                    <img src={LangIcon} alt="" />
                </div>
            </div>
            <img className="MenuIcon" onClick={showDrawer} src={location.pathname ==='/' ? MenuIconImg :blackMenuIcon} alt="" />
        </div>
        <Drawer placement="right" width={178} onClose={onClose} closable={false} open={open} rootClassName="DrawerBodyRoot" className="DrawerBody">
            <img src={bannerLogo} alt="" />
            <div className='DrawerMenuItem' onClick={()=>{goPath('/')}}>Home</div>
            <div className='DrawerMenuItem' onClick={()=>{goPath('/Swap')}}>Swap</div>
            <div className='DrawerMenuItem' onClick={()=>{goPath('/Convert')}}>Convert</div>
            <div className='DrawerMenuItem' onClick={()=>{goPath('/Wallet')}}>Wallet</div>
        </Drawer>
        </>
    )
}
