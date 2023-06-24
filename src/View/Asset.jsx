import '../assets/style/Asset.scss'
import { Empty, Modal, Popover} from 'antd';
import LFTIcon from '../assets/image/LFTIcon.png'
import JTDown from '../assets/image/JTDown.png'
import CloseIcon from '../assets/image/CloseIcon.png'
import {useState} from 'react'
export default function Asset() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const content = (
        <div className='PopoverContent'>
            <div className='SelItem'>
                <img src={LFTIcon} alt="" />USDT
            </div>
            <div className='SelItem'>
                <img src={LFTIcon} alt="" />SLFT
            </div>
        </div>
    );
  return (
    <div className='Asset'>
        <div className="Title">Asset</div>
        <div className="AssetBox">
            <div className="TotalInfo">
                <div className="TotalItem">
                    <div className="label">Total of the whole network</div>
                    <div className="value">$ 27104.92</div>
                </div>
                <div className="separate"></div>
                <div className="TotalItem">
                    <div className="label">DAO Treasury</div>
                    <div className="value">$ 3150.00</div>
                </div>
            </div>
            <div className="balanceRow">
                <div className="balanceItem">
                    <div className="label">USDT balance</div>
                    <div className="value">1,210,020.002</div>
                </div>
                <div className="balanceItem">
                    <div className="label">LFT balance</div>
                    <div className="value">1,210,020.002</div>
                </div>
                <div className="balanceItem">
                    <div className="label">eLFT balance</div>
                    <div className="value">1,210,020.002</div>
                </div>
            </div>
            <div className="WithdrawBtn flexCenter">Withdraw</div>
        </div>
        <div className="WithdrawRecord">
            <div className="WithdrawRecordTitle flexCenter">Withdraw record</div>
            <div className="recordItem">
                <div className="address">dadsda*****dadsdd</div>
                <div className="amount">5000000 USDT</div>
                <div className="time">2022/02/22 12:22:33</div>
            </div>
        </div>
                {/* 领取收益弹窗 */}
        <Modal open={isModalOpen} onCancel={handleCancel} closable={false} footer={null} wrapClassName="modalBox" width="676px" maskClosable={true}>
            <img className="Close" src={CloseIcon} alt="" />
            <div className="Title">Withdraw</div>
            <div className='putBox'>
                <input type="text" placeholder='Enter the withdrawal amount' />
                <Popover content={content} placement="bottom" overlayClassName="TeamPopover" trigger="click">
                    <div className="selToken">
                        <img src={LFTIcon} alt="" />
                        LFT
                        <img src={JTDown} alt="" />
                    </div>
                </Popover>
            </div>
            <div className="Confirm flexCenter">Confirm</div>
        </Modal>
    </div>
  )
}
