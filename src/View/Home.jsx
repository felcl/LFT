import React from 'react'
import '../assets/style/Home.scss'
import bannerLogo from '../assets/image/bannerLogo.png'
import BannerTokenName from '../assets/image/BannerTokenName.png'
import ModelImg1 from '../assets/image/ModelImg1.png'
import ModelImg2 from '../assets/image/ModelImg2.png'
import ModelImg3 from '../assets/image/ModelImg3.png'
import ModelImg4 from '../assets/image/ModelImg4.png'

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
        </div>
    </div>
  )
}
