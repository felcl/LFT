import React, { useState } from 'react'
import { Empty, Modal} from 'antd';
import '../assets/style/Team.scss'
import copyIcon from '../assets/image/copyIcon.png'
import CloseIcon from '../assets/image/CloseIcon.png'

export default function Team() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
      };
    let RecordList = [].fill(1)
    RecordList = new Array(3).fill({});
    console.log(RecordList)
  return (
    <div className="Team">
        <div className="Title">Team</div>
        <div className="TeamBox">
            <div className="AmountRow">
                <div className="AmountItem">
                    <div className="AmountLabel">Members</div>
                    <div className="AmountValue">7</div>
                </div>
                <div className="AmountItem">
                    <div className="AmountLabel">Total performance</div>
                    <div className="AmountValue">$1,251,523.252</div>
                </div>
            </div>
            <div className="invitedInfo">
                <div className="invitedMe">
                    <div className="invitedMeLabel">who invited me</div>
                    <div className="invitedMeValue">asdfasdasd**asdasd9dad</div>
                </div>
                <div className="invitedLink">
                    <div className="invitedLinkLabel">My invitation link</div>
                    <div className="invitedLinkValue">
                    http://sadfs.dadsf.com/sdadsf
                    <img src={copyIcon} alt="" />
                    <div className="invitedBtn" onClick={showModal}>invited</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='RewardList'>
            <div className="RewardTotal">
                <div className="label">Invitation reward</div>
                <div className="value">$1,251,523.252</div>
            </div>
            {
            RecordList.length > 0 ? 
            RecordList.map((item,index)=><div className="RewardItem">
                    <span className="address">dadsda*****dadsdd</span>
                    <span className="time">2022/02/22 12:22:33</span>
                </div>)
            :
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>

        {/* 邀请弹窗 */}
        <Modal open={isModalOpen} closable={false}>
            <img className="Close" src={CloseIcon} alt="" />
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    </div>
  )
}
