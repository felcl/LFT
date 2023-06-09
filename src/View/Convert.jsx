import {useNavigate} from 'react-router-dom'
import '../assets/style/Convert.scss'
import ConvertJt from '../assets/image/ConvertJt.png'
import ELFTIcon from '../assets/image/ELFTIcon.png'
import LFTIcon from '../assets/image/LFTIcon.png'

export default function Convert() {
    const navigate = useNavigate();
    return (
        <div className="Convert">
            <div className="Title">Convert</div>
            <div className="ConvertBox">
                <div className="label">From</div>
                <div className='JtPosition'>
                <img className='ConvertJt' src={ConvertJt} alt="" />
                <div className="put">
                    <input type="text" />
                    <span className="Max">MAX</span>
                    <div className='TokenInfo flexCenter'>
                        <img src={ELFTIcon} alt="" />
                        ELFT
                    </div>
                </div>
                <div className="label">From</div>
                <div className="put">
                    <input type="text" />
                    <div className='TokenInfo flexCenter'>
                        <img src={ELFTIcon} alt="" />
                        LFT
                    </div>
                </div>
                </div>
                <div className="ServiceCharge">
                Service charge：5%
                </div>
                <div className="submit flexCenter">Confirm</div>
            </div>
            <div className="goRecord" onClick={()=>{navigate('/ConvertRecord')}}>
                {'Convert record >'}
            </div>
        </div>
    )
}
