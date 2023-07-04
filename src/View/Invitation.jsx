import { useEffect, useState } from 'react'
import { Empty, Modal, notification} from 'antd';
import { useWeb3React } from "@web3-react/core";
import { useConnectWallet } from '../web3'
import { getReserves } from '../web3'
import {AddrHandle, dateFormat} from '../utils/tool'
import { useSelector } from "react-redux";
import Axios from '../axios'
import copy from "copy-to-clipboard";
import BigNumber from 'big.js'
import {NumSplic} from '../utils/tool'
import '../assets/style/Invitation.scss'
import { useTranslation } from 'react-i18next'
import copyIcon from '../assets/image/copyIcon.png'
import CloseIcon from '../assets/image/CloseIcon.png'
import VipIcon from '../assets/image/VipIcon.png'
import Vip1 from '../assets/image/Vip1.png'
import Vip2 from '../assets/image/Vip2.png'
import Vip3 from '../assets/image/Vip3.png'


export default function Team() {
    const web3React = useWeb3React();
    const { t } = useTranslation()
    const Token = useSelector(Store =>Store.token)
    const [isinvitationModal, setIsinvitationModal] = useState(false);
    const [isBind,setIsBind] = useState(-1)
    const [refereeUserAddress,setRefereeUserAddress] = useState('')
    const [invitationAddr,setInvitationAddr] = useState('')
    const [teamAmount,setTeamAmount] = useState(0)
    const [Rate,setRate] = useState(0)
    const [allTeamAmount,setAllTeamAmount] = useState(0)
    const [inviteLink,setInviteLink] = useState(0)
    const [refereeList,setRefereeList] = useState([])
    const [userInfo,setUserInfo] = useState(null)
    const VipIcon = [undefined,Vip1,Vip2,Vip3]
    useEffect(()=>{
        // console.log(chain,chains)
        if(web3React.active){
          // subscribeLFT('Approval',(event)=>{
          //   console.log(event,"授权事件监听")
          // })
          getReserves().then(res=>{
            setRate(new BigNumber(res._reserve0).div(res._reserve1).div(new BigNumber(10**18).div(10**6)))
          })
        }
      },[web3React.active])
    useEffect(()=>{
        if(Token){
            Axios.get('/uUser/checkBind').then(res=>{
                setIsBind(res.data.data)
                console.log(res,'用户是否绑定上级')
            })
            Axios.get('/uUser/userDetail').then(res=>{
                setUserInfo(res.data.data)
                console.log(res,'用户信息')
            })
            Axios.get('/uUser/teamAndReferee').then(res=>{
                setRefereeUserAddress(res.data.data.refereeUserAddress)
                setTeamAmount(res.data.data.teamAmount)
                setAllTeamAmount(res.data.data.allTeamAmount)
                console.log(res,'获取上级地址和团队收益')
            })
            Axios.get('/dao/userReferee').then(res=>{
                setRefereeList(res.data.data)
                console.log(res,'邀请记录')
            })
        }
    },[Token])
    useEffect(()=>{
        if(web3React.active){
            setInviteLink(location.origin+location.pathname+'#/?invite='+web3React.account)
        }
    },[web3React.active,web3React.account])
    // const showModal = () => {
    //     setIsModalOpen(true);
    // };
    const copyFun = (text) => {
        copy(text);
        return notification.open({
            message: 'Success',
            description:t('copysuccessfully')
        });
    };

    const invitationAddrFun = () => {
        if(!invitationAddr){
            return notification.open({
                message: 'Error',
                description:t('Pleaseenterthe3')
            });
        }
        Axios.post('/uUser/bind',{
            refereeUserAddress:invitationAddr
        }).then(res=>{
            console.log(res,"绑定上级结果")
            if(res.data.code === 200){
                setIsinvitationModal(false)
                notification.open({
                    message: 'Success',
                    description:t('bindsuccessfully')
                });
                Axios.get('/uUser/checkBind').then(res=>{
                    setIsBind(res.data.data)
                    console.log(res,'用户是否绑定上级')
                })
                Axios.get('/uUser/teamAndReferee').then(res=>{
                    setRefereeUserAddress(res.data.data.refereeUserAddress)
                    setTeamAmount(res.data.data.teamAmount)
                    setAllTeamAmount(res.data.data.allTeamAmount)
                    console.log(res,'获取上级地址和团队收益')
                })
            }else{
                console.log(res.data.msg)
                notification.open({
                    message: 'Success',
                    description:t('bindingfailed')
                });
            }
        })
    }
    const changeInvitationAddr = (e) => {
        setInvitationAddr(e.target.value)
        // console.log(e.target.value)
    }
    // let RecordList = [].fill(1)
    // RecordList = new Array(3).fill({});
  return (
    <div className="Invitation">
        <div className="Title">Invitation</div>
        <div className="TeamBox">
            <div className="userAddress">
                <div className="userHeaderBox">
                    <div className="userHeader"></div>
                </div>
                <span className="long">{web3React.active ? web3React.account : t('Pleaseconnectwallet')}</span>
                <span className="short">{web3React.active ? AddrHandle(web3React.account,6,6) : t('Pleaseconnectwallet')}</span>
                <img className='copyIcon' src={copyIcon} onClick={()=>{copyFun(web3React.account)}} alt="" />
                {
                    userInfo && <img className='VipIcon' src={VipIcon[userInfo.svipLevel]} alt="" />
                }
                
            </div>
            <div className="AmountRow">
                <div className="AmountItem">
                    <div className="AmountLabel">{t('Members')}</div>
                    <div className="AmountValue">7</div>
                </div>
                <div className="AmountItem">
                    <div className="AmountLabel">{t('Totalperformance')}</div>
                    <div className="AmountValue">${allTeamAmount}</div>
                </div>
            </div>
            <div className="invitedInfo">
                <div className="invitedMe">
                    <div className="invitedMeLabel">{t('whoinvitedme')}</div>
                    {
                        isBind !== -1 && <>
                        {isBind === 0 && <div className="invitedBtn flexCenter" onClick={()=>{setIsinvitationModal(true)}}>{t('Invitationaddress')}</div>}
                        {isBind === 1 && refereeUserAddress && <div className="invitedMeValue">{AddrHandle(refereeUserAddress,5,5)}</div>}
                        </>
                    }
                </div>
                <div className="invitedLink">
                    <div className="invitedLinkLabel">{t('Myinvitationlink')}</div>
                    <div className="invitedLinkValue">
                        {AddrHandle(inviteLink,16,10)}
                        {/* <span className="long">{inviteLink}</span>
                        <span className="short">{AddrHandle(inviteLink,16,10)}</span> */}
                        <img src={copyIcon} onClick={()=>{copyFun(inviteLink)}} alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div className='RewardList'>
            <div className="RewardTotal">
                <div className="label">{t('Invitationreward')}</div>
                <div className="value">{teamAmount} eLFT {Rate && `≈ ${NumSplic(teamAmount / Rate,6)} USDT`}</div>
            </div>
            {
            refereeList.length > 0 ?
            refereeList.map((item,index)=><div className="RewardItem" key={index}>
                    <span className="address">{AddrHandle(item.userAddress,6,6)}</span>
                    <span className="time">{dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime))}</span>
                </div>)
            :
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>

        {/* 邀请弹窗 */}
        <Modal open={isinvitationModal} onCancel={()=>{setIsinvitationModal(false)}} closable={false} footer={null} wrapClassName="modalBox" width="676px" maskClosable={true}>
            <img className="Close" src={CloseIcon} onClick={()=>{setIsinvitationModal(false)}} alt="" />
            <div className="Title">{t('Invitationaddress')}</div>
            <div className='putBox'>
                <input type="text" placeholder='Enter invitation address' onChange={changeInvitationAddr} />
            </div>
            <div className="Confirm flexCenter" onClick={invitationAddrFun}>{t('Confirm')}</div>
        </Modal>

    </div>
  )
}
