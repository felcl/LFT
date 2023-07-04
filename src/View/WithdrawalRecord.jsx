import '../assets/style/Record.scss'
import { Empty } from 'antd';
import { useTranslation } from 'react-i18next'
import JTReturn from '../assets/image/JTReturn.png'
export default function SwapRecord() {
    const { t } = useTranslation()
    let RecordList = [].fill(1)
    RecordList = new Array(3).fill({});
    console.log(RecordList)
  return (
    <div className="Record">
        <div className="Title">
            <img src={JTReturn} alt="" />
            {t('Withdrawalrecord')}
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
