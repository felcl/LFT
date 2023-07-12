import '../assets/css/Home.scss'
import bannerImg from '../assets/img/bannerImg.png'
import SwapBanner from '../assets/img/SwapBanner.png'
import exhibit1 from '../assets/img/exhibit1.png'
import exhibit2 from '../assets/img/exhibit2.png'
import exhibit3 from '../assets/img/exhibit3.png'
import Telegram from '../assets/img/Telegram.png'
import Twitter from '../assets/img/Twitter.png'
import Linkedin from '../assets/img/Linkedin.png'
export default function Home() {
  return (
    <div className='Home'>
        <div className="firstScreen">
            <div className='bannermain'>
                <img src={bannerImg} alt="" />
                <div className="Content">
                    <div className="Title">An innovative options trading platform on Arbitrum</div>
                    <div className="subTitle">LiftedStake is the leading liquid staking solution - providing a simple way to get rewards with eLFT</div>
                    <div className="BtnRow">
                        <div className="Btn1 flexCenter">STAKE NOW</div>
                        <div className="Btn2 flexCenter">HOW DOES IT WORD?</div>
                    </div>
                </div>
            </div>
            <div className='totalRow'>
                <div className="TotalItem">
                    <div className="label">Total staked tokens</div>
                    <div className="value">$11,983,033,2825</div>
                </div>
                <div className="TotalItem">
                    <div className="label">Total rewards paid</div>
                    <div className="value">$11,983,033,2825</div>
                </div>
                <div className="TotalItem">
                    <div className="label">Total staked tokens</div>
                    <div className="value">$11,983,033,2825</div>
                </div>
            </div>
        </div>
        <div className="Tabs">
            <div className="Tab Active">SWAP</div>
            <div className="Tab">STAKING</div>
            <div className="Tab">EARN</div>
        </div>
        <div className='TabContent'>
            <div className="TabBanner">
                <img src={SwapBanner} alt="" />
            </div>
            <div className="exhibit">
                <div className="exhibitItem">
                    <div className="exhibitImg"><img src={exhibit1} alt="" /></div>
                    <span>Supports quantitative hedging of option trades for returns</span>
                </div>
                <div className="exhibitItem">
                    <div className="exhibitImg"><img src={exhibit2} alt="" /></div>
                    <span>Extra bonus will be distributed by sharing and inviting </span>
                </div>
                <div className="exhibitItem">
                    <div className="exhibitImg"><img src={exhibit3} alt="" /></div>
                    <span>Double benefits from one click</span>
                </div>
                <div className="Btn1 flexCenter">Go to Swap</div>
                <div className="Btn2 flexCenter">Read the Docs</div>
            </div>
        </div>
        <div className="SocialMedia">
            <div className="SocialMediaTitle">Social Media</div>
            <div className="SocialMediaSubTitle">Join our community</div>
            <div className="SocialMediaRow">
                <div className="SocialMediaItem flexCenter">
                    <img src={Telegram} alt="" />
                    <div className="Intro">
                        <div className="name">Telegram</div>
                        <div className="text">Join chat</div>
                    </div>
                </div>
                <div className="SocialMediaItem flexCenter">
                    <img src={Twitter} alt="" />
                    <div className="Intro">
                        <div className="name">Twitter</div>
                        <div className="text">Follow @LiftedStake</div>
                    </div>
                </div>
                <div className="SocialMediaItem flexCenter">
                    <img src={Linkedin} alt="" />
                    <div className="Intro">
                        <div className="name">Linkedin</div>
                        <div className="text">Official</div>
                    </div>
                </div>
                <div className="SocialMediaItem flexCenter">
                    <img src={Linkedin} alt="" />
                    <div className="Intro">
                        <div className="name">Linkedin</div>
                        <div className="text">Cofounder</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
