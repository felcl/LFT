
import '../assets/style/Convert.scss'
import ConvertJt from '../assets/image/ConvertJt.png'

export default function Convert() {
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
                  <div className='TokenInfo flexCenter'>ELFT</div>
              </div>
              <div className="label">From</div>
              <div className="put">
                  <input type="text" />
                  <div className='TokenInfo flexCenter'>LFT</div>
              </div>
            </div>
            <div className="ServiceCharge">
            Service charge：5%
            </div>
            <div className="submit flexCenter">Confirm</div>
        </div>
        <div className="Record">
            {'Swap record >'}
        </div>
    </div>
  )
}
