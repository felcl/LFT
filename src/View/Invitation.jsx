import { useEffect, useState } from 'react'
import { Empty, Modal, Popover} from 'antd';
import {useAccount,} from 'wagmi'
import {AddrHandle, dateFormat} from '../utils/tool'
import { useSelector } from "react-redux";
import Axios from '../axios'
import '../assets/style/Invitation.scss'
import copyIcon from '../assets/image/copyIcon.png'
import CloseIcon from '../assets/image/CloseIcon.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import VipIcon from '../assets/image/VipIcon.png'
import JTDown from '../assets/image/JTDown.png'

export default function Team() {
    const {isConnected, address } = useAccount()
    const Token = useSelector(Store =>Store.token)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isinvitationModal, setIsinvitationModal] = useState(false);
    const [isBind,setIsBind] = useState(-1)
    const [refereeUserAddress,setRefereeUserAddress] = useState('')
    const [teamAmount,setTeamAmount] = useState(0)
    const [inviteLink,setInviteLink] = useState(0)
    const [refereeList,setRefereeList] = useState([])

    useEffect(()=>{
        if(Token){
            Axios.get('/uUser/checkBind').then(res=>{
                setIsBind(res.data.data)
                console.log(res,'用户是否绑定上级')
            })
            Axios.get('/uUser/teamAndReferee').then(res=>{
                setRefereeUserAddress(res.data.data.refereeUserAddress)
                setTeamAmount(res.data.data.teamAmount)
                console.log(res,'获取上级地址和团队收益')
            })
            Axios.get('/dao/userReferee').then(res=>{
                setRefereeList(res.data.data)
                console.log(res,'邀请记录')
            })
        }
    },[Token])
    useEffect(()=>{
        if(isConnected){
            setInviteLink(location.origin+location.pathname+'#/?invite='+address)
        }
    },[isConnected,address])
    const showModal = () => {
        setIsModalOpen(true);
      };
    const handleCancel = () => {
        setIsModalOpen(false);
      };
    let RecordList = [].fill(1)
    RecordList = new Array(3).fill({});
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
                <span className="long">{isConnected ? address : '请连接钱包'}</span>
                <span className="short">{isConnected ? AddrHandle(address,6,6) : '请连接钱包'}</span>
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
                    <div className="AmountValue">${teamAmount}</div>
                </div>
            </div>
            <div className="invitedInfo">
                <div className="invitedMe">
                    <div className="invitedMeLabel">who invited me</div>
                    {
                        isBind !== -1 && <>
                        {isBind === 0 && <div className="invitedBtn flexCenter" onClick={()=>{setIsinvitationModal(true)}}>Invitation address</div>}
                        {isBind === 1 && refereeUserAddress && <div className="invitedMeValue">{AddrHandle(refereeUserAddress,5,5)}</div>}
                        </>
                    }
                </div>
                <div className="invitedLink">
                    <div className="invitedLinkLabel">My invitation link</div>
                    <div className="invitedLinkValue">
                        {AddrHandle(inviteLink,16,10)}
                        {/* <span className="long">{inviteLink}</span>
                        <span className="short">{AddrHandle(inviteLink,16,10)}</span> */}
                        <img src={copyIcon} alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div className='RewardList'>
            <div className="RewardTotal">
                <div className="label">Invitation reward</div>
                <div className="value">${teamAmount}</div>
            </div>
            {
            refereeList.length > 0 ? 
            refereeList.map((item,index)=><div className="RewardItem" key={index}>
                    <span className="address">{AddrHandle(item.refereeUserAddress,6,6)}</span>
                    <span className="time">{dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime))}</span>
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
