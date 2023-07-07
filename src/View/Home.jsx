
import '../assets/style/Home.scss'
import CountUp from 'react-countup'
import {useNavigate} from 'react-router-dom'
import Axios from '../axios'
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
import In from '../assets/image/In.png'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Home() {
    const { t } = useTranslation()
    const [HomeData,setHomeData] = useState(null)
    const navigate = useNavigate();
    useEffect(()=>{
        Axios.get('/home/data').then((res)=>{
            setHomeData(res.data.data)
            console.log("首页数据",res)
        })
    },[])
    return (
        <div className="Home">
            <div className="Banner">
                <img className="bannerLogo" src={bannerLogo} alt="" />
                <img className="BannerTokenName" src={BannerTokenName} alt="" />
                <div className="introduce">{t('Aninnovativeoptions')}</div>
                <div className="StakeNow flexCenter" onClick={()=>{navigate('/Stake')}}>{t('Stakenow')}</div>
            </div>
            <div className="TotalValue">
                <div className="TotalValueItem">
                    <div className="label">{t('Totalstakedtokens')}</div>
                    {
                        HomeData && <div className="Value">$<CountUp start={0} end={HomeData.totalPledgeAmount} duration={1} decimals="0"></CountUp></div>
                    }
                </div>
                <div className="TotalValueItem">
                    <div className="label">{t('Totalrewardspaid')}</div>
                    {
                        HomeData && <div className="Value">$<CountUp start={0} end={HomeData.totalReward} duration={1} decimals="0"></CountUp></div>
                    }
                </div>
                <div className="TotalValueItem">
                    <div className="label">{t('TotalTreasury')}</div>
                    {
                        HomeData && <div className="Value">$<CountUp start={0} end={HomeData.nationalAmount} duration={1} decimals="0"></CountUp></div>
                    }
                </div>
            </div>
            <div className="ModelGrid">
                <div>
                    <img src={ModelImg1} alt="" />
                    <div className="flexCenter">
                        <div className="Btn flexCenter" onClick={()=>{navigate('/Swap')}}>{t('Swap')}</div>
                        <div className="subText">LFT/USDT</div>
                    </div>
                </div>
                <div>
                    <img src={ModelImg2} alt="" />
                    <div className="flexCenter">
                        <div className="Btn flexCenter" onClick={()=>{navigate('/Convert')}}>{t('Convert')}</div>
                        <div className="subText">eLFT ➡ LFT</div>
                    </div>
                </div>
                <div>
                    <img src={ModelImg3} alt="" />
                    <div className="flexCenter">
                        <div className="Btn flexCenter" onClick={()=>{navigate('/Stake')}}>{t('Stakenow')}</div>
                        <div className="subText">Up to <span className='green'>300%</span> returns</div>
                    </div>
                </div>
                <div>
                    <img src={ModelImg4} alt="" />
                    <div className="flexCenter">
                        <div className="Btn flexCenter" onClick={()=>{navigate('/Invitation')}}>{t('ExclusiveMembers')}</div>
                        <div className="subText">{t('Comingsoon...')}</div>
                    </div>
                </div>
            </div>
            <div className="Step">
                <div className="Title">{t('HowLFTworks')}</div>
                <div className="stepRow">
                    <div className="progressBar"></div>
                    <div className="stepItem">
                        <div className="stepTitle">{t('STEP')}.1</div>
                        <div className="stepImgBorder">
                            <div className='stepImgBox flexCenter'>
                                <img src={step1} alt="" />
                            </div>
                        </div>
                        <div className='stepName'>{t('Swap')}</div>
                        <div className='stepText'>
                        {t('Stakeanyamount')}
                        </div>
                    </div>
                    <div className="stepItem">
                        <div className="stepTitle">{t('STEP')}.2</div>
                        <div className="stepImgBorder">
                            <div className='stepImgBox flexCenter'>
                                <img src={step2} alt="" />
                            </div>
                        </div>
                        <div className='stepName'>{t('Stake')}</div>
                        <div className='stepText'>
                        {t('ReceiveliquidstTokens')}
                        </div>
                    </div>
                    <div className="stepItem">
                        <div className="stepTitle">{t('STEP')}.3</div>
                        <div className="stepImgBorder">
                            <div className='stepImgBox flexCenter'>
                                <img src={step3} alt="" />
                            </div>
                        </div>
                        <div className='stepName'>Earn extra rewards</div>
                        <div className='stepText'>
                            {t('UseyourstTokens')}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="Title">About LFT</div>
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
            <div className="HomeTeam">
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
            </div> */}
            <div className="Join">
                {/* <div className="Title">Join our community</div>
                <div className="subTitle">Join our community</div> */}
                <div className="JoinGrid">
                    <div className="JoinMain">
                        <span className="JoinMainTitle">{t('SocialMedia')}</span>
                        <span className="JoinMainsunTitle">{t('Joinourcommunity')}</span>
                        <img src={rabbit} alt="" />
                    </div>
                    <div className="joinItem">
                        <img src={Telegram} alt="" />
                        <div className="joinItemInfo">
                            <div className="InfoNmae">{t('Telegram')}</div>
                            <div className="InfoSub">{t('Joinchat')}</div>
                        </div>
                    </div>
                    <div className="joinItem">
                        <img src={Twitter} alt="" />
                        <div className="joinItemInfo">
                            <div className="InfoNmae">Twitter</div>
                            <div className="InfoSub">Follow @LiftedStake</div>
                        </div>
                    </div>
                    <div className="joinItem">
                        <img src={In} alt="" />
                        <div className="joinItemInfo">
                            <div className="InfoNmae">Official Linkedin</div>
                        </div>
                    </div>
                    <div className="joinItem">
                        <img src={In} alt="" />
                        <div className="joinItemInfo">
                            <div className="InfoNmae">Cofounder Linkedin</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
