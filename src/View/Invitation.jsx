import { useState } from 'react'
import { Empty, Modal, Popover} from 'antd';
import '../assets/style/Invitation.scss'
import copyIcon from '../assets/image/copyIcon.png'
import CloseIcon from '../assets/image/CloseIcon.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import VipIcon from '../assets/image/VipIcon.png'
import JTDown from '../assets/image/JTDown.png'

export default function Team() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isinvitationModal, setIsinvitationModal] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);``
      };
    const handleCancel = () => {
        setIsModalOpen(false);
      };
    let RecordList = [].fill(1)
    RecordList = new Array(3).fill({});
    console.log(RecordList)
    const content = (
        <div className='PopoverContent'>
            <div className='SelItem'>
                <img src={LFTIcon} alt="" />USDT
            </div>
            <div className='SelItem'>
                <img src={LFTIcon} alt="" />SLFT
            </div>
        </div>
    );
  return (
    <div className="Invitation">
        <div className="Title">Team</div>
        <div className="TeamBox">
            <div className="userAddress">
                <div className="userHeaderBox">
                    <div className="userHeader"></div>
                </div>
                <span className="long">0x3Bd8CA9023897224b01fE25b33137b67A89ec70F</span>
                <span className="short">0x3Bd8****9ec70F</span>
                <img className='copyIcon' src={copyIcon} alt="" />
                <img className='VipIcon' src={VipIcon} alt="" />
            </div>
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
                    <div className="invitedBtn flexCenter" onClick={()=>{setIsinvitationModal(true)}}>Invitation address</div>
                    <div className="invitedMeValue">asdfasdasd**asdasd9dad</div>
                </div>
                <div className="invitedLink">
                    <div className="invitedLinkLabel">My invitation link</div>
                    <div className="invitedLinkValue">
                        <span className="long">http://sadfs.dadsf.com/sdadsf</span>
                        <span className="short">http://sadf***dadsf</span>
                        <img src={copyIcon} alt="" />
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
            RecordList.map((item,index)=><div className="RewardItem" key={index}>
                    <span className="address">dadsda*****dadsdd</span>
                    <span className="time">2022/02/22 12:22:33</span>
                </div>)
            :
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>

        {/* 邀请弹窗 */}
        <Modal open={isinvitationModal} onCancel={()=>{setIsinvitationModal(false)}} closable={false} footer={null} wrapClassName="modalBox" width="676px" maskClosable={true}>
            <img className="Close" src={CloseIcon} alt="" />
            <div className="Title">invitation address</div>
            <div className='putBox'>
                <input type="text" placeholder='Enter invitation address' />
            </div>
            <div className="Confirm flexCenter">Confirm</div>
        </Modal>
        {/* 领取收益弹窗 */}
        <Modal open={isModalOpen} onCancel={handleCancel} closable={false} footer={null} wrapClassName="modalBox" width="676px" maskClosable={true}>
            <img className="Close" src={CloseIcon} alt="" />
            <div className="Title">Withdraw</div>
            <div className='putBox'>
                <input type="text" placeholder='Enter the withdrawal amount' />
                <Popover content={content} placement="bottom" overlayClassName="TeamPopover" trigger="click">
                    <div className="selToken">
                        <img src={LFTIcon} alt="" />
                        LFT
                        <img src={JTDown} alt="" />
                    </div>
                </Popover>
            </div>
            <div className="Confirm flexCenter">Confirm</div>
        </Modal>
    </div>
  )
}
