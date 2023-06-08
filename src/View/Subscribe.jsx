import '../assets/style/Subscribe.scss'
export default function Subscribe() {
  return (
    <div className="Subscribe">
        <div className="Title">Subscribe</div>
        <div className="ordinary">
            <div className="typeRow">
                <div className="typeItem flexCenter">100 U</div>
                <div className="typeItem flexCenter">500 U</div>
                <div className="typeItem flexCenter">1000 U</div>
            </div>
            <div className="infoRow">
                <div className="label">You will receive</div><div className="value">~$8.02</div>
            </div>
            <div className="infoRow">
                <div className="label">Price Impact</div><div className="value">-0.05%</div>
            </div>
            <div className="infoRow">
                <div className="label">Minimum output</div><div className="value">0.000501389 ETH</div>
            </div>
            <div className="infoRow">
                <div className="label">Expected output</div><div className="value">0.000526458 ETH</div>
            </div>
            <div className="submit flexCenter">Confirm</div>
            <div className='record'>{'Subscribe record >'}</div>
        </div>
        <div className="Title">SVIP</div>
        <div className="Svip">
            <div className='Total'>
                <div className="label">Total treasury</div>
                <div className="amount">12100200002</div>
            </div>
            <div className="subTypeLabel">Subscription type</div>
            <div className="subType">
                <div className="typeItem flexCenter">100 U</div>
                <div className="typeItem flexCenter">500 U</div>
                <div className="typeItem flexCenter">1000 U</div>
            </div>
            <div className="submit flexCenter">Confirm</div>
        </div>
    </div>
  )
}
