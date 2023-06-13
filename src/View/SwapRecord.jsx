import '../assets/style/Record.scss'
import { Empty } from 'antd';
import {useNavigate} from 'react-router-dom'
import JTReturn from '../assets/image/JTReturn.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import USDTIcon from '../assets/image/USDTIcon.png'
export default function SwapRecord() {
    const navigate = useNavigate();
    let RecordList = [].fill(1)
    RecordList = new Array(3).fill({});
    console.log(RecordList)
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
                        <img src={LFTIcon} alt="" />
                        LFT
                    </div>
                    <span>20.000000</span>
                </div>
                <div className="SwapStatus">
                    <div className="status success">Succeed</div>
                    <div className="SwapTime">2023-06-08 22:29</div>
                </div>
                <div className="to">
                    <div className="tokenInfo">
                        <img src={USDTIcon} alt="" />
                        LFT
                    </div>
                    <span>20.000000</span>
                </div>
            </div>)
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>
    </div>
  )
}
