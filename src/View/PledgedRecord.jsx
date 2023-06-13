import '../assets/style/Record.scss'
import { Empty } from 'antd';
import JTReturn from '../assets/image/JTReturn.png'
import {useSearchParams,useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
export default function SwapRecord() {
    const navigate = useNavigate();
    const [search] = useSearchParams();
    let RecordList = [].fill(1)
    RecordList = new Array(3).fill({});
    let [Type,setType] = useState('')
    useEffect(()=>{
        if(search.get('type')){
            setType(search.get('type'))
        }else{
            navigate(-1)
        }
    },[search.get('type')])
  return (
    <div className="Record">
        <div className="Title">
            <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
            {Type} amount pledged
            <span></span>
        </div>
        <div className='RecordList'>
            {
                RecordList.length ?
                RecordList.map((item,index)=><div className="RecordItem" key={index}>
                    <div className="name">{Type}</div>
                    <div className="amount">5000000</div>
                    <div className="time">2022/02/22 12:22:33</div>
                </div>)
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>
    </div>
  )
}
