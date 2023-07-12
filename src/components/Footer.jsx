import '../assets/css/componentsCss/Footer.scss'
import HeaderLogo from '../assets/img/HeaderLogo.png'
export default function Footer() {
  return (
    <div className="Footer">
        <div className="FooterContent">
            <img src={HeaderLogo} alt="" />
            <div className='FooterItemRow'>
                <div className='FooterItem'>
                    <div className="point"></div>
                    Intro to LIFTED (YouTube)
                </div>
                <div className='FooterItem'>
                    <div className="point"></div>
                    How do I set up MetaMask on Avalanche?
                </div>
                <div className='FooterItem'>
                    <div className="point"></div>
                    Team
                </div>
                <div className='FooterItem'>
                    <div className="point"></div>
                    Docs
                </div>
            </div>
        </div>
    </div>
  )
}
