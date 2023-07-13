import '../assets/css/Swap.scss'
import HeaderLogo from '../assets/img/HeaderLogo.png'
import LFTIcon from '../assets/img/LFTIcon.png'
import USDTIcon from '../assets/img/USDTIcon.png'
import SwapIcon from '../assets/img/SwapIcon.png'
import setIcon from '../assets/img/setIcon.png'
import reSetIcon from '../assets/img/reSetIcon.png'
import Docs from '../assets/img/Docs.png'
import toIcon from '../assets/img/toIcon.png'
import copyIcon from '../assets/img/copyIcon.png'
export default function Swap() {
  return (
    <div className="Swap">
      <div className="Title">SWAP</div>
      <div className="SwapContent">
        <div className="main">
          <div className="PutBox">
            <div className="FromPut top">
              <input type="text" />
              <div className="TokenInfo">
                <img src={LFTIcon} alt="" />
                LFT
              </div>
            </div>
            <img src={SwapIcon} alt="" />
            <div className="ToPut bottom">
              <input type="text" />
              <div className="TokenInfo">
                <img src={USDTIcon} alt="" />
                LFT
              </div>
            </div>
          </div>
          <div className="SwapInfo">
            <div className="InfoRow">
              <div className="label">Fee</div>
              <div className="value">-</div>
            </div>
            <div className="InfoRow">
              <div className="label">Expected output</div>
              <div className="value">-</div>
            </div>
          </div>
          <div className="operate">
            <img src={setIcon} alt="" />
            <img src={reSetIcon} alt="" />
          </div>
          <div className="SwapBtn flexCenter">SWAP</div>
        </div>
        <div className="vice">
          {false && <div className='Competitive'>
            <div className="CompetitiveTitle">Competitive returns</div>
            <div className="CompetitiveText">
            The simplest SWAP operation brings multiple benefits, and the speed and convenience bring you very competitive returns.
            </div>
            <div className="ReadDocs flexCenter">Read the Docs <img src={Docs} alt="" /></div>
          </div>}
          <div className="Balance">
            <div className="InfoRow">
              <span className="label">Address: </span><span className="value">212155S.......D65S4565</span>
            </div>
            <div className="InfoRow">
              <span className="label">Balences: </span>
            </div>
            <div className="BalencesItem">
              <img src={LFTIcon} alt="" />
              255623.2323 LFT
            </div>
            <div className="BalencesItem">
              <img src={USDTIcon} alt="" />
              255623.2323 USDT
            </div>
          </div>
          <div className="exchangeRate">
            <div className="Rate">
              <img className="TokenIcon" src={LFTIcon} alt="" />
              1.2564 LFT
              <img className="ToIcon" src={toIcon} alt="" />
              <img className="TokenIcon" src={USDTIcon} alt="" />
              1 .2654USDT
            </div>
            <div className="contract">
              Address：
              <img className='Logo' src={HeaderLogo} alt="" />
              <span>0x41fe1...b95b4</span>
              <img src={copyIcon} alt="" />
            </div>
            <div className="goRecord flexCenter">{'SWAP RECORD >'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
