import '../assets/style/Asset.scss'
import { Empty, Modal, Popover, notification} from 'antd';
// import LFTIcon from '../assets/image/LFTIcon.png'
// import JTDown from '../assets/image/JTDown.png'
import CloseIcon from '../assets/image/CloseIcon.png'
import {useAccount, useNetwork, useSwitchNetwork, useConnect} from 'wagmi'
import { arbitrumGoerli} from 'wagmi/chains'
import {useState} from 'react'
import Axios from '../axios'
import {drawToken} from '../web3'
import BigNumber from 'big.js';
export default function Asset() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { switchNetwork, isLoading:isLoadingSwitchNetwork } = useSwitchNetwork()
    const [amount, setAmount] = useState('')
    const {isConnected, address } = useAccount()
    const { chain, chains } = useNetwork()
    const { connect, connectors, isLoading } = useConnect({
        chainId: arbitrumGoerli.id,
    })
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showWithdrawModal = ()=>{
        if(amount && new BigNumber(amount).lte(0)){
            return notification.open({
                message: 'Warning',
                description:
                '请输入争取的提现数量'
            });
        }
        setIsModalOpen(true);
    }
    const Submit = ()=>{
        Axios.post('/dao/draw',{
            amount
        }).then(res=>{
            if(res.data.code === 200){
                drawToken(address,res.data.data)
            }
            console.log(res,"提现加密数据")
        })
    }
    const putAmoubt = (e)=>{
        let putVal = changeNumPut(e.target.value)
        setAmount(putVal)
    }
    const changeNumPut = (value, accuracy)=>{
        if (/^\./g.test(value)) {
          value = "0" + value;
        }
        let putVal = value.replace(/[^\d.]/g, "");
        if(putVal.split('.').length>2){
          putVal = [putVal.split('.')[0],putVal.split('.').slice(1,3).join('')].join('.')
        }
        if (accuracy !== undefined) {
          let putArr = putVal.split(".");
          if (putArr[1] && putArr[1].length > accuracy) {
            putArr[1] = putArr[1].slice(0, accuracy);
          }
          putVal = putArr.join(".");
        }
        return putVal;
    }
    const ConnectWallet = ()=>{
        if(isConnected && chain.id !== chains[0].id){
            return switchNetwork(arbitrumGoerli.id)
        }
        if(!isConnected){
            connect({ connector: connectors[1] })
        }
    }
    const WithdrawRunder = ()=>{
        if(!address || chain.id !== chains[0].id){
            return <div className="WithdrawBtn flexCenter" onClick={ConnectWallet}>Connect wallet</div>
        }
        // if(!amount || new BigNumber(amount).lte(0)){
        //     return <div className="WithdrawBtn flexCenter Disable" onClick={Submit}>Withdraw</div>
        // }
        return <div className="WithdrawBtn flexCenter" onClick={showWithdrawModal}>Withdraw</div>
    }
    // const content = (
    //     <div className='PopoverContent'>
    //         <div className='SelItem'>
    //             <img src={LFTIcon} alt="" />USDT
    //         </div>
    //         <div className='SelItem'>
    //             <img src={LFTIcon} alt="" />SLFT
    //         </div>
    //     </div>
    // );
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
            {/* <div className="WithdrawBtn flexCenter" onClick={showWithdrawModal}>Withdraw</div> */}
            {WithdrawRunder()}
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
                <input type="text" placeholder='Enter the withdrawal amount' value={amount} onChange={putAmoubt} />
                {/* <Popover content={content} placement="bottom" overlayClassName="TeamPopover" trigger="click">
                    <div className="selToken">
                        <img src={LFTIcon} alt="" />
                        LFT
                        <img src={JTDown} alt="" />
                    </div>
                </Popover> */}
            </div>
            <div className="Confirm flexCenter" onClick={Submit}>Confirm</div>
        </Modal>
    </div>
  )
}
