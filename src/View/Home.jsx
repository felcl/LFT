
import '../assets/style/Home.scss'
import bannerLogo from '../assets/image/bannerLogo.png'
import BannerTokenName from '../assets/image/BannerTokenName.png'
import ModelImg1 from '../assets/image/ModelImg1.png'
import ModelImg2 from '../assets/image/ModelImg2.png'
import ModelImg3 from '../assets/image/ModelImg3.png'
import ModelImg4 from '../assets/image/ModelImg4.png'
import step1 from '../assets/image/step1.png'
import step2 from '../assets/image/step2.png'
import step3 from '../assets/image/step3.png'
import rabbit from '../assets/image/rabbit.png'
import Telegram from '../assets/image/Telegram.png'
import Twitter from '../assets/image/Twitter.png'

export default function Home() {
  return (
    <div className="Home">
        <div className="Banner">
            <img src={bannerLogo} alt="" />
            <img className="BannerTokenName" src={BannerTokenName} alt="" />
            <div className="introduce">An innovative options trading platform on Arbitrum</div>
            <div className="StakeNow flexCenter">Stake now</div>
        </div>
        <div className="TotalValue">
            <div className="TotalValueItem">
                <div className="label">Total staked tokens</div>
                <div className="Value">$11,983,033,282</div>
            </div>
            <div className="TotalValueItem">
                <div className="label">Total rewards paid</div>
                <div className="Value">$572,854,126</div>
            </div>
            <div className="TotalValueItem">
                <div className="label">Total Treasury</div>
                <div className="Value">$11,983,033,282</div>
            </div>
        </div>
        <div className="ModelGrid">
            <div>
                <img src={ModelImg1} alt="" />
                <p className="flexCenter">· Swap ·</p>
            </div>
            <div>
                <img src={ModelImg2} alt="" />
                <p className="flexCenter">· Convert ·</p>
            </div>
            <div>
                <img src={ModelImg3} alt="" />
                <div className="Info">
                    <div className="Label">Subscribe</div>
                    <div className="InfoRow">
                        <div className="InfoLeft">
                            <span>300%</span>
                            <span>interests</span>
                        </div>
                        <div className="StakeNow flexCenter">Stake now</div>
                    </div>
                </div>
            </div>
            <div>
                <img src={ModelImg4} alt="" />
                <div className="Info">
                    <div className="Label">SVIP</div>
                    <div className="InfoRow">
                        <div className="InfoLeft">
                            <div className="Infoa"></div>
                        </div>
                        <div className="StakeNow flexCenter">Stake now</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="Step">
            <div className="Title">How LFT works</div>
            <div className="stepRow">
                <div className="progressBar"></div>
                <div className="stepItem">
                    <div className="stepTitle">STEP.1</div>
                    <div className="stepImgBorder">
                        <div className='stepImgBox flexCenter'>
                            <img src={step1} alt="" />
                        </div>
                    </div>
                    <div className='stepName'>Swap</div>
                    <div className='stepText'>
                    Stake any amount of your tokens to access daily staking rewards
                    </div>
                </div>
                <div className="stepItem">
                    <div className="stepTitle">STEP.2</div>
                    <div className="stepImgBorder">
                        <div className='stepImgBox flexCenter'>
                            <img src={step2} alt="" />
                        </div>
                    </div>
                    <div className='stepName'>Swap</div>
                    <div className='stepText'>
                    Receive liquid stTokens and start to receive rewards in real-time
                    </div>
                </div>
                <div className="stepItem">
                    <div className="stepTitle">STEP.3</div>
                    <div className="stepImgBorder">
                        <div className='stepImgBox flexCenter'>
                            <img src={step3} alt="" />
                        </div>
                    </div>
                    <div className='stepName'>Swap</div>
                    <div className='stepText'>
                    Use your stTokens across DeFi to compound more to your daily staked rewards
                    </div>
                </div>
            </div>
        </div>
        <div className="Title">About LFT</div>
        <div className='About'>
            <div className="AboutLeft">
            · Staking reserves 22.5%<br/>
            · Trading rewards 22.5%<br/>
            · Early investors 16.5%<br/>
            · Liquidity 15.5%<br/>
            · Foundation, team andconsultants 13.5%<br/>
            · Presale round 7.5%<br/>
            · Marketing & Partnership 2%<br/>
            </div>
            <div className="AboutRight">
                <div className="AboutRightItem"></div>
                <div className="AboutRightItem"></div>
                <div className="AboutRightItem"></div>
            </div>
        </div>
        <div className="Team">
            <div className="Title">Our team</div>
            <div className='TeamCard'>
                <div className="CardHader"></div>
                <div className="CardInfo">
                    <div>
                        <span className='Name'>Jason</span>
                        <span className='Position'>CEO</span>
                    </div>
                    <div className="introduce">
                    20 year plus IT professional, <br/>
                    open source enthusiast, linux user, <br/>
                    background in private gaming sector, <br/>
                    gambling facilities and team manager.<br/>
                    </div>
                </div>
            </div>
        </div>
        <div className="Join">
            <div className="Title">Join our community</div>
            <div className="subTitle">Join our community</div>
            <div className="JoinGrid">
                <div className="JoinMain">
                    <span className="JoinMainTitle">LFT in LinkedIn</span>
                    <span className="JoinMainsunTitle">Join the community and ask questions</span>
                    <img src={rabbit} alt="" />
                </div>
                <div className="joinItem">
                    <img src={Telegram} alt="" />
                    <div className="joinItemInfo">
                        <div className="InfoNmae">Telegram</div>
                        <div className="InfoSub">Join chat</div>
                    </div>
                </div>
                <div className="joinItem">
                    <img src={Twitter} alt="" />
                    <div className="joinItemInfo">
                        <div className="InfoNmae">Twitter</div>
                        <div className="InfoSub">Follow @LiftedStake</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
