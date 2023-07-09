import '../assets/style/Record.scss'
import { Empty, Modal, notification, Table} from 'antd';
import { useSelector } from "react-redux";
import JTReturn from '../assets/image/JTReturn.png'
import CloseIcon from '../assets/image/CloseIcon.png'
import {useSearchParams,useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Axios from '../axios';
import { dateFormat ,NumSplic} from '../utils/tool';
import { useTranslation } from 'react-i18next'
export default function SwapRecord() {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const Token = useSelector(Store =>Store.token)
    const [search] = useSearchParams();
    const [RecordList,setRecordList] = useState([])
    const [Type,setType] = useState(search.get('type'))
    const [RedeemModal,setRedeemModal] = useState(false)
    const [RedeemAmount,setRedeemAmount] = useState(0)
    const [scrollObj,setScrollObj] = useState({})
    const [countdown,setcountdown] = useState('')
    const [targetTime,setTargetTime] = useState(0)
    useEffect(()=>{
        if(search.get('type')){
            setType(search.get('type'))
        }else{
            navigate(-1)
        }
    },[])
    useEffect(()=>{
        setInterval(()=>{
            if(targetTime && RedeemModal){
                let Time = targetTime - (+new Date() / 1000)
                setcountdown(`${Math.floor(Time / 3600)} : ${Math.floor(Time % 3600 / 60)} : ${Math.floor(Time % 60)}`)
            }
        },1000)
    },[targetTime,RedeemModal])
    useEffect(()=>{
        console.log(document.body.clientWidth)
        if(document.body.clientWidth <= 450){
            setScrollObj({
                x:500
            })
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
        if(RecordList.length < 5){
            return notification.open({
                message: 'Warning',
                description:t('Lessthanfive')
            });
        }
        Axios.post('/dao/checkRedemption',{
            "idList": RecordList.slice(-5).map(item=>item.id)
        }).then(res=>{
            if(res.data.data){
                setTargetTime((res.data.data.time+1) / 1000)
                let targetTime = (res.data.data.time+1) / 1000 - (+new Date() / 1000)
                setcountdown(`${Math.floor(targetTime / 3600)} : ${Math.floor(targetTime % 3600 / 60)} : ${Math.floor(targetTime % 60)}`)
                setRedeemAmount(res.data.data.amount)
            }
            setRedeemModal(true)
        })
    }
    const cancel = ()=>{
        setRedeemModal(false)
    }
    const redeemFun = ()=>{
        Axios.post('/dao/redemption').then(res=>{
            console.log(res,"赎回")
            Axios.get('/dao/elftPledgeRecord').then(res=>{
                if(res.data.data){
                    setRecordList(res.data.data)
                }
                console.log(res,"用户ELFT质押记录")
            })
            return notification.open({
                message: 'Success',
                description:t('successfulRedemption')
            });
        })
    }
    const columns = [
        {
          title: 'ID',
          dataIndex: 'pledgeNo',
          key: 'pledgeNo',
          align:'center',
          width:'180px',
        //   fixed: 'left',
        },
        {
          title: t('Quantity'),
          dataIndex: 'buyAmount',
          key: 'buyAmount',
          render: (buyAmount,row) => {
            if(Type === 'LFT') {
                return row.buyAmount
            }else{
                return row.pledgeAmount
            }
          },
          align:'center'
        },
        {
          title: t('Period(days)'),
          dataIndex: 'createTime',
          render: (createTime) => {
            return Math.ceil((new Date().getTime() - createTime) / 259200000) + 'day(s)'
            // console.log(Math.ceil((new Date().getTime() - createTime) / 259200000))
            // console.log(new Date().getTime() - createTime / 259200000)
            // new Date(createTime).getTime()
          },
          key: 'createTime',
          align:'center',
          width:'200px'
        },
    ];
  return (
    <div className="Record">
        <div className="Title">
            <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
            {Type} {t('amountPledged')}
            <span></span>
        </div>
        {
            Type === 'ELFT' && 
            <div className='RecordList'>
                {
                    RecordList.length ?
                    // RecordList.slice(0,5).map((item,index)=><div className="RecordItem" key={index}>
                    //     <div className="name" style={{width:'20%',textAlign:'center'}}>{item.id}</div>
                    //     <div className="amount" style={{width:'30%',textAlign:'center'}}>{item.pledgeAmount}</div>
                    //     <div className="time" style={{width:'40%',textAlign:'center'}}>{dateFormat('YYYY-mm-dd HH:MM:SS',new Date(item.createTime))}</div>
                    // </div>)
                    <Table dataSource={RecordList.slice(-5)} columns={columns} rowKey="id" pagination={false} scroll={scrollObj} />
                    :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
                <div className='redeemBtn'>
                    <div className="btn flexCenter" onClick={Redeem}>{t('Redeem')}</div>
                </div>
            </div>
        }

        <div className='RecordList'>
            {/* RecordList.map((item,index)=><div className="RecordItem" key={index}>
                    <div className="name" style={{width:'20%',textAlign:'center'}}>{item.pledgeNo}</div>
                    <div className="amount" style={{width:'30%',textAlign:'center'}}>{item.buyAmount}</div>
                    <div className="time" style={{width:'40%',textAlign:'center'}}>{dateFormat('YYYY-mm-dd HH:MM:SS',new Date(item.createTime))}</div>
                </div>) */}
            {
                RecordList.length ?
                <Table dataSource={RecordList} columns={columns} rowKey="id" pagination={false} scroll={scrollObj} />
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>
        <Modal open={RedeemModal} onCancel={()=>{setRedeemModal(false)}} closable={false} footer={null} wrapClassName="modalBox" width="676px" maskClosable={true}>
            <img className="Close" src={CloseIcon} onClick={()=>{setRedeemModal(false)}} alt="" />
            <div className="Title">{t('Redeemthesefive')}</div>
            <div className='redeemInfoRow'>
                <div className="label">{t('untilthenext')}</div>
                {
                    targetTime && <div className="value">{countdown}</div>
                }
            </div>
            <div className='redeemInfoRow'>
                <div className="label">{t('Expectedloss')}</div>
                {
                    RecordList.length >0 && <div className="value" >{NumSplic(RedeemAmount,4)}</div>
                }
            </div>
            <div className="btnRow">
                <div className="redeemConfirm flexCenter" onClick={redeemFun}>{t('Confirm')}</div>
                <div className="redeemConfirm cancel flexCenter" onClick={cancel}>{t('cancel')}</div>
            </div>
            
        </Modal>
    </div>
  )
}
