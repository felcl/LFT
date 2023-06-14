import '../assets/style/Record.scss'
import { Empty } from 'antd';
import {useNavigate} from 'react-router-dom'
import JTReturn from '../assets/image/JTReturn.png'
export default function SwapRecord() {
    const navigate = useNavigate();
    let RecordList = [].fill(1)
    RecordList = new Array(3).fill({});
    console.log(RecordList)
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
                    <div className="name">LFT</div>
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
