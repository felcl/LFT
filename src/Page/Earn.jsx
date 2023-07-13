import { useState } from 'react'
import '../assets/css/Earn.scss'
import schedule from '../assets/img/schedule.png'
import LFTIcon from '../assets/img/LFTIcon.png'
import eLFTIcon from '../assets/img/eLFTIcon.png'
import USDTIcon from '../assets/img/USDTIcon.png'
import copyIcon from '../assets/img/copyIcon.png'
export default function Earn() {
  const [scheduleValue,setscheduleValue] = useState(30)
  return (
    <div className="Earn">
      <div className="Title">Earn</div>
      <div className="scheduleBox">
        <img src={schedule} alt="" style={{'--width':scheduleValue + '%'}} />
        <div className="schedule">
          <div className="scheduleValue" style={{width:scheduleValue + '%'}}></div>
        </div>
      </div>
      <div className="progress">Earning progress: <span>200%</span></div>
      <div className='EarnMain'>
        <div className="EarnLeft">
          <div className="EarnItem">
            <div className="EarnName">LFT</div>
            <div className="EarnInfoRow">
              <div className="Label">Staked Values</div>
              <div className="Value">$1.05</div>
            </div>
            <div className="EarnInfoRow">
              <div className="Label">Staked Amount</div>
              <div className="Value"><img src={LFTIcon} alt="" /> 10.00 LFT</div>
            </div>
            <div className="EarnInfoRow">
              <div className="Label">Daily Reward Rate</div>
              <div className="Value">1.1%</div>
            </div>
            <div className="EarnInfoRow">
              <div className="Label">Accumulated Sharing Incentives</div>
              <div className="Value"><img src={eLFTIcon} alt="" /> 34.52 eLFT</div>
            </div>
            <div className="EarnInfoRow">
              <div className="Label">Total Released Rewards</div>
              <div className="Value"><img src={eLFTIcon} alt="" /> 3.12 eLFT</div>
            </div>
            <div className="EarnInfoRow">
              <div className="Label">Unreleased Percentage</div>
              <div className="Value"> 72.56%</div>
            </div>
            <div className="Btn flexCenter">SWAP LFT</div>
          </div>
          <div className="EarnItem">
            <div className="EarnName">eLFT</div>
            <div className="EarnInfoRow">
              <div className="Label">Staked Values</div>
              <div className="Value">$1.05</div>
            </div>
            <div className="EarnInfoRow">
              <div className="Label">Staked Amount</div>
              <div className="Value"><img src={eLFTIcon} alt="" /> 10.00 LFT</div>
            </div>
            <div className="EarnInfoRow">
              <div className="Label">Accumulated Swap Fee Rewards</div>
              <div className="Value"><img src={eLFTIcon} alt="" /> 12.52 eLFT</div>
            </div>
            <div className="EarnInfoRow">
              <div className="Label">Expected Daily Swap Fee</div>
              <div className="Value">$12,234</div>
            </div>
            <div className="EarnInfoRow">
              <div className="Label">Largest MPs</div>
              <div className="Value">3.27</div>
            </div>
            <div className="EarnInfoRow">
              <div className="Label">Boost Percentage</div>
              <div className="Value">327%</div>
            </div>
            <div className="Btn flexCenter">Stake eLFT</div>
          </div>
        </div>
        <div className="EarnRight">
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
          <div className="InvitationInfo">
            <div className="InvitationTitle">Invitation</div>
            <div className="label">Total performance</div>
            <div className="value1">9,999,999.999</div>
            <div className="label">who invited me</div>
            <div className="value2">0x ******12345 </div>
            <div className="label">My invitation link</div>
            <div className="value3">http://liftedbit.fi/abcde <img src={copyIcon} alt="" /></div>
            <div className="label">Members</div>
            <div className="value4">7</div>
            <div className="label">My inviter</div>
            <div className="inviterItem">
              <div className="address">0x41fe1...b95b4</div>
              <div className="time">2023.07.11</div>
            </div>
            <div className="inviterItem">
              <div className="address">0x41fe1...b95b4</div>
              <div className="time">2023.07.11</div>
            </div>
            <div className="inviterItem">
              <div className="address">0x41fe1...b95b4</div>
              <div className="time">2023.07.11</div>
            </div>
            <div className="inviterItem">
              <div className="address">0x41fe1...b95b4</div>
              <div className="time">2023.07.11</div>
            </div>
            <div className="inviterItem">
              <div className="address">0x41fe1...b95b4</div>
              <div className="time">2023.07.11</div>
            </div>
            <div className="inviterItem">
              <div className="address">0x41fe1...b95b4</div>
              <div className="time">2023.07.11</div>
            </div>
            <div className="More flexCenter">
              {'MORE >'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
