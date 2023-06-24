import '../assets/style/Record.scss'
import { Empty, Modal} from 'antd';
import { useSelector } from "react-redux";
import JTReturn from '../assets/image/JTReturn.png'
import CloseIcon from '../assets/image/CloseIcon.png'
import {useSearchParams,useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Axios from '../axios';
import { dateFormat } from '../utils/tool';
export default function SwapRecord() {
    const navigate = useNavigate();
    const Token = useSelector(Store =>Store.token)
    const [search] = useSearchParams();
    const [RecordList,setRecordList] = useState([])
    const [Type,setType] = useState(search.get('type'))
    const [RedeemModal,setRedeemModal] = useState(false)
    useEffect(()=>{
        if(search.get('type')){
            setType(search.get('type'))
        }else{
            navigate(-1)
        }
    },[])
    useEffect(()=>{
        if(Token){
            console.log(Type)
            if(Type === 'LFT'){
                Axios.get('/dao/stakeRecord').then(res=>{
                    if(res.data.data){
                        setRecordList(res.data.data)
                    }
                    console.log(res,"用户LFT质押记录")
                })
            }
            if(Type === 'ELFT'){
                Axios.get('/dao/elftPledgeRecord').then(res=>{
                    if(res.data.data){
                        setRecordList(res.data.data)
                    }
                    console.log(res,"用户ELFT质押记录")
                })
            }
        }
    },[Token,Type])
    const Redeem = ()=>{
        setRedeemModal(true)
    }
    const cancel = ()=>{
        setRedeemModal(false)
    }
    const redeemFun = ()=>{
        Axios.post('/dao/redemption').then(res=>{
            console.log(res,"赎回")
        })
    }
  return (
    <div className="Record">
        <div className="Title">
            <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
            {Type} amount pledged
            <span></span>
        </div>
        {
            Type === 'ELFT' && 
            <div className='RecordList'>
                <div className="RecordColumn">
                    <div className="column" style={{width:'20%',textAlign:'center'}}>ID</div>
                    <div className="column" style={{width:'30%',textAlign:'center'}}>Quantity</div>
                    <div className="column" style={{width:'40%',textAlign:'center'}}>Period(days)</div>
                </div>
                {
                    RecordList.length ?
                    RecordList.slice(0,5).map((item,index)=><div className="RecordItem" key={index}>
                        <div className="name" style={{width:'20%',textAlign:'center'}}>{item.id}</div>
                        <div className="amount" style={{width:'30%',textAlign:'center'}}>{item.pledgeAmount}</div>
                        <div className="time" style={{width:'40%',textAlign:'center'}}>{dateFormat('YYYY-mm-dd HH:MM:SS',new Date(item.createTime))}</div>
                    </div>)
                    :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
                <div className='redeemBtn'>
                    <div className="btn flexCenter" onClick={Redeem}>Redeem</div>
                </div>
            </div>
        }

        <div className='RecordList'>
            <div className="RecordColumn">
                <div className="column" style={{width:'20%',textAlign:'center'}}>ID</div>
                <div className="column" style={{width:'30%',textAlign:'center'}}>Quantity</div>
                <div className="column" style={{width:'40%',textAlign:'center'}}>Period(days)</div>
            </div>
            {
                RecordList.length ?
                RecordList.map((item,index)=><div className="RecordItem" key={index}>
                    <div className="name" style={{width:'20%',textAlign:'center'}}>{item.id}</div>
                    <div className="amount" style={{width:'30%',textAlign:'center'}}>{item.pledgeAmount}</div>
                    <div className="time" style={{width:'40%',textAlign:'center'}}>{dateFormat('YYYY-mm-dd HH:MM:SS',new Date(item.createTime))}</div>
                </div>)
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>
        <Modal open={RedeemModal} onCancel={()=>{setRedeemModal(false)}} closable={false} footer={null} wrapClassName="modalBox" width="676px" maskClosable={true}>
            <img className="Close" src={CloseIcon} onClick={()=>{setRedeemModal(false)}} alt="" />
            <div className="Title">Redeem these five stakes?</div>
            <div className='redeemInfoRow'>
                <div className="label">until the next release</div>
                <div className="value">152:25:20</div>
            </div>
            <div className='redeemInfoRow'>
                <div className="label">Expected loss</div>
                <div className="value">$158626</div>
            </div>
            <div className="btnRow">
                <div className="redeemConfirm flexCenter" onClick={redeemFun}>Confirm</div>
                <div className="redeemConfirm cancel flexCenter" onClick={cancel}>cancel</div>
            </div>
            
        </Modal>
    </div>
  )
}
