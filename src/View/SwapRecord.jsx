import '../assets/style/Record.scss'
import { Empty } from 'antd';
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import JTReturn from '../assets/image/JTReturn.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import USDTIcon from '../assets/image/USDTIcon.png'
import { useEffect, useState } from 'react';
import Axios from '../axios';
import { dateFormat} from '../utils/tool'
export default function SwapRecord() {
    const navigate = useNavigate();
    const Token = useSelector(Store =>Store.token)
    let [RecordList,setRecordList] = useState([])
    const IconMap = {
        LFT:LFTIcon,
        USDT:USDTIcon
    }
    useEffect(()=>{
        if(Token){
            Axios.get('/swap/userSwapRecord').then(res=>{
                if(res.data.data){
                    setRecordList(res.data.data)
                }
                console.log(res,"用户交易数据")
            })
        }
    },[Token])
  return (
    <div className="Record">
        <div className="Title">
            <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
            Swap record
            <span></span>
        </div>
        <div className='RecordList'>
            {
                RecordList.length ? 
                RecordList.map((item,index)=><div className="SwapRecord" key={index}>
                <div className="form">
                    <div className="tokenInfo">
                        <img src={IconMap[item.token0Name]} alt="" />
                        {item.token0Name}
                    </div>
                    <span>{item.token0Amount}</span>
                </div>
                <div className="SwapStatus">
                    <div className="status success">Succeed</div>
                    <div className="SwapTime">{dateFormat('YYYY-mm-dd HH:MM:SS',new Date(item.createTime))}</div>
                </div>
                <div className="to">
                    <div className="tokenInfo">
                        <img src={IconMap[item.token1Name]} alt="" />
                        {item.token1Name}
                    </div>
                    <span>{item.token1Amount}</span>
                </div>
            </div>)
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>
    </div>
  )
}
