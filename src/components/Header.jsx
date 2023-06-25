import { useState } from 'react';
import { Drawer, Popover } from 'antd';
import { useAccount, useConnect, useNetwork, useSwitchNetwork  } from 'wagmi'
import { arbitrumGoerli} from 'wagmi/chains'
import {AddrHandle} from '../utils/tool'
import '../assets/style/componentsStyle/Header.scss'
import bannerLogo from '../assets/image/bannerLogo.png'
import HomeIcon from '../assets/image/HomeIcon.png'
import HomeIconBlack from '../assets/image/HomeIconBlack.png'
import HomeIconOrange from '../assets/image/HomeIconOrange.png'
import SwapIcon from '../assets/image/SwapIcon.png'
import SwapIconBlack from '../assets/image/SwapIconBlack.png'
import SwapIconOrange from '../assets/image/SwapIconOrange.png'
import Wallet from '../assets/image/Wallet.png'
// import WalletIconBlack from '../assets/image/WalletIconBlack.png'
// import WalletIconOrange from '../assets/image/WalletIconOrange.png'
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
import EarnIcon from '../assets/image/EarnIcon.png'
import EarnIconBlack from '../assets/image/EarnIconBlack.png'
import EarnIconOrange from '../assets/image/EarnIconOrange.png'
import InvitationIcon from '../assets/image/InvitationIcon.png'
import InvitationIconBlack from '../assets/image/InvitationIconBlack.png'
import InvitationIconOrange from '../assets/image/InvitationIconOrange.png'
import {useNavigate ,useLocation} from 'react-router-dom'


export default function Header() {
    const { chain, chains } = useNetwork()
    const { switchNetwork, isLoading:isLoadingSwitchNetwork } = useSwitchNetwork()
    const { address, isConnected } = useAccount()
    const { connect, connectors, isLoading } = useConnect({
        chainId: arbitrumGoerli.id,
    })
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
        if(isConnected && chain.id !== chains[0].id){
            return switchNetwork(arbitrumGoerli.id)
        }
        if(!isConnected){
            connect({ connector: connectors[1] })
        }
        // console.log(switchNetwork(arbitrum.id))
        // console.log(chains, switchNetwork)
    }
    const AboutContent = (
        <div className='AboutPopoverContent' style={{width:'170px'}}>
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
    const AssetContent = (
        <div className='AboutPopoverContent' style={{width:'140px'}}>
            <div className='SelItem' onClick={()=>{goPath('/Asset')}}>
                <img src={Wallet} alt="" />
                wallet
            </div>
            <div className='SelItem' onClick={()=>{goPath('/Earn')}}>
                <img src={EarnIcon} alt="" />
                Earn
            </div>
            <div className='SelItem' onClick={()=>{goPath('/Invitation')}}>
                <img src={InvitationIcon} alt="" />
                Invitation
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
                {/* <Popover content={WalletContent} placement="bottom"  overlayClassName="AboutPopover" getPopupContainer={() => document.getElementById('About')}>
                    <div className={MenuClass()} id='About'><img src={MenuIcon(undefined,AboutIcon,AboutIconBlack,AboutIconOrange)} alt="" />Wallet</div>
                </Popover> */}
                {/* <div className={MenuClass('/Earn')} onClick={()=>{goPath('/Earn')}}><img src={MenuIcon('/Earn',EarnIcon,EarnIconBlack,EarnIconOrange)} alt="" />Earn</div> */}
                {/* <div className={MenuClass('/Invitation')} onClick={()=>{goPath('/Invitation')}}><img src={MenuIcon('/Invitation',InvitationIcon,InvitationIconBlack,InvitationIconOrange)} alt="" />Invitation</div> */}
                {/* <div className={MenuClass()}><img src={MenuIcon(undefined,AboutIcon,AboutIconBlack,AboutIconOrange)} alt="" />About</div> */}
                <Popover content={AssetContent} placement="bottom"  overlayClassName="AboutPopover" getPopupContainer={() => document.getElementById('Asset')}>
                    <div className={MenuClass()} id='Asset'><img src={MenuIcon(undefined,AboutIcon,AboutIconBlack,AboutIconOrange)} alt="" />Asset</div>
                </Popover>
                <Popover content={AboutContent} placement="bottom"  overlayClassName="AboutPopover" getPopupContainer={() => document.getElementById('About')}>
                    <div className={MenuClass()} id='About'><img src={MenuIcon(undefined,AboutIcon,AboutIconBlack,AboutIconOrange)} alt="" />About</div>
                </Popover>
            </div>
            <div className="HeaderRight">
                <div className='connect flexCenter' onClick={ConnectWallet}>
                {
                    (isLoading || isLoadingSwitchNetwork) && <svg viewBox="25 25 50 50">
                        <circle cx="50" cy="50" r="20"></circle>
                    </svg>
                }
                { isConnected && chain.id === chains[0].id ? AddrHandle(address) : 'Connect wallet'}
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
