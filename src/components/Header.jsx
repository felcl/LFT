import React from 'react'
import '../assets/style/componentsStyle/Header.scss'
import HomeIcon from '../assets/image/HomeIcon.png'
import SwapIcon from '../assets/image/SwapIcon.png'
import ConvertIcon from '../assets/image/ConvertIcon.png'
import LangIcon from '../assets/image/LangIcon.png'

export default function Header() {
  return (
    <div className="Header">
        <div className="Menu">
            <div className="MenuItem"><img src={HomeIcon} alt="" />Home</div>
            <div className="MenuItem"><img src={SwapIcon} alt="" />Swap</div>
            <div className="MenuItem"><img src={ConvertIcon} alt="" />Convert</div> 
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
