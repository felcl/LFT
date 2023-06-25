import '../assets/style/Record.scss'
import { Empty } from 'antd';
import Axios from '../axios'
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import JTReturn from '../assets/image/JTReturn.png'
import { useEffect, useState } from 'react';
import { dateFormat } from '../utils/tool'
export default function SwapRecord() {
    const navigate = useNavigate();
    const Token = useSelector(Store =>Store.token)
    const [RecordList,setRecordList] = useState([])
    console.log(RecordList)
    useEffect(()=>{
        if(Token){
            Axios.get('/swap/exchangeDetail').then(res=>{
                if(res.data.code === 200 && res.data.data){
                    setRecordList(res.data.data)
                }
                console.log(res,"兑换记录")
            })
        }
    },[Token])

  return (
    <div className="Record">
        <div className="Title">
            <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
            Convert record
             <span></span>
        </div>
        <div className='RecordList'>
            {
                RecordList.length ? 
                RecordList.map((item,index)=><div className="RecordItem" key={index}>
                    <div className="name">{item.toCoin}</div>
                    <div className="amount">{item.incomeNum}</div>
                    <div className="time">{dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime))}</div>
                </div>)
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>
    </div>
  )
}
