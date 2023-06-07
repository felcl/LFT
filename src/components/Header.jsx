import React from 'react'
import '../assets/style/componentsStyle/Header.scss'
import HomeIcon from '../assets/image/HomeIcon.png'
import SwapIcon from '../assets/image/SwapIcon.png'
import ConvertIcon from '../assets/image/ConvertIcon.png'
import LangIcon from '../assets/image/LangIcon.png'
import {useNavigate ,useLocation} from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    function MenuClass(path){
        if(location.pathname === path){
            return 'MenuItem activeMenuItem'
        }
        if(location.pathname !=='/'){
            return 'MenuItem BlackMenuItem'
        }
    }
    return (
        <div className="Header">
            <div className="Menu">
                <div className={MenuClass('/')} onClick={()=>{navigate('/')}}><img src={HomeIcon} alt="" />Home</div>
                <div className={MenuClass('/Swap')} onClick={()=>{navigate('/Swap')}}><img src={SwapIcon} alt="" />Swap</div>
                <div className={MenuClass('/Convert')} onClick={()=>{navigate('/Convert')}}><img src={ConvertIcon} alt="" />Convert</div> 
            </div>
            <div className="HeaderRight">
                <div className='connect flexCenter'>Connect wallet</div>
                <div className="Lang">
                    <img src={LangIcon} alt="" />
                </div>
            </div>
        </div>
    )
}
