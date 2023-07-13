import '../assets/css/Stake.scss'
import {useState} from 'react'
import {Table, Modal} from 'antd'
import Docs from '../assets/img/Docs.png'
import TokenImg from '../assets/img/TokenImg.png'
import LFTIcon from '../assets/img/LFTIcon.png'
import USDTIcon from '../assets/img/USDTIcon.png'
export default function Stake() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const dataSource = [
    {
      key: '1',
      name: '20220222122233',
      age: 5000000,
      address: '1day(s)',
    },
    {
      key: '2',
      name: '20220222122233',
      age: 5000000,
      address: '1day(s)',
    },
  ];
  
  const RecordColumns = [
    {
      title: 'Account',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
    },
    {
      title: 'Action',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
    },
    {
      title: 'Quantity',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: 'time',
      dataIndex: 'address',
      key: 'address',
      align: 'right',
    },
  ];
  const columns = [
    {
      title: 'ID',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Quantity',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
    },
    {
      title: 'Period(days)',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
  ];
  return (
    <div className="Stake">
      <div className="Title">STAKE</div>
      <div className="subTitle">Weekly Rewards: $2.08K (157 AVAX)</div>
      <div className="Using flexCenter">Using LIFTED <img src={Docs} alt="" /></div>
      {/* 未链接钱包 */}
      {
        false && <div className="TokenInfoBox">
        <div className="TokenInfo">
          <img src={TokenImg} alt="" />
          <div className="InfoItem">
            <div className="label">TOKEN</div>
            <div className="value">LFT</div>
          </div>
          <div className="InfoItem">
            <div className="label">MY TVL</div>
            <div className="value">n/a</div>
          </div>
          <div className="InfoItem">
            <div className="label">REWARDS PER DAY</div>
            <div className="value">$301</div>
          </div>
          <div className="InfoItem">
            <div className="label">TVL</div>
            <div className="value">$2.62M</div>
          </div>
          <div className="APR">
            <div className="label">APR</div>
            <div className="value">4%</div>
          </div>
        </div>
        <div className="ConnectTips">Connect your wallet to manage this pool</div>
      </div>
      }
      <div className="InfoAndBalence">
        <div className="TokenInfo">
          <div className="column">
            <img src={TokenImg} alt="" />
            <div className="InfoItem">
              <div className="label">REWARDS PER DAY</div>
              <div className="value">$301</div>
            </div>
          </div>
          <div className="column">
            <div className="InfoItem">
              <div className="label">TOKEN</div>
              <div className="value">LFT</div>
            </div>
            <div className="InfoItem">
              <div className="label">TVL</div>
              <div className="value">$2.62M</div>
            </div>
          </div>
          <div className="column">
            <div className="InfoItem">
              <div className="label">MY TVL</div>
              <div className="value">n/a</div>
            </div>
            <div className="APR">
            <div className="label">APR</div>
            <div className="value">4%</div>
          </div>
          </div>
        </div>
        <div className="Balance">
          <div className="InfoRow">
            <span className="label">Address: </span><span className="value">212155S.......D65S4565</span>
          </div>
          <div className="InfoRow">
            <span className="label">Balences: </span>
          </div>
          <div className="BalencesItem">
            <img src={LFTIcon} alt="" />
            255623.2323 LFT
          </div>
          <div className="BalencesItem">
            <img src={USDTIcon} alt="" />
            255623.2323 USDT
          </div>
        </div>
      </div>
      <div className="combination">
        <div className="combinationItem">
          <div className="combinationTitle">Deposit</div>
          <div className="MyLabel">MY WALLET</div>
          <div className="MyValue">1 LFT</div>
          <div className="putLabel">Amount to deposit</div>
          <input type="text" />
          <div className="hint">Insufficient balance</div>
          <div className="submit flexCenter" onClick={ ()=>{setIsDepositModalOpen(true)}}>Deposit</div>
        </div>
        <div className="combinationItem">
          <div className="combinationTitle">Withdraw</div>
          <div className="MyLabel">MY STAKE BALANCE</div>
          <div className="MyValue">0 eLFT</div>
          <div className="putLabel">Amount to Withdraw</div>
          <input type="text" />
          <div className="hint">Insufficient balance</div>
          <div className="submit flexCenter" onClick={ ()=>{setIsWithdrawModalOpen(true)}}>Withdraw</div>
        </div>
        <div className="combinationItem">
          <div className="combinationTitle">Claim</div>
          <div className="MyLabel">MY PENDING REWARDS</div>
          <div className="MyValue">0 eLFT</div>
          <div className="submit flexCenter">Claim</div>
          <div className="illustrate">
          Rewards are claimed automatically during deposit and withdraw.
          </div>
        </div>
      </div>
      <div className="tableBox">
        <Table dataSource={dataSource} pagination={false} columns={columns} />
        <div className="more flexCenter">{'MORE > '}</div>
      </div>
      <div className="chartAndRecord">
        <div className="chart">
          <div className="statistics">
            <div className="statisticsItem">
              <div className="label">24h High</div>
              <div className="value">$1726.57</div>
            </div>
            <div className="statisticsItem">
              <div className="label">24h Low</div>
              <div className="value">$1651.57</div>
            </div>
            <div className="statisticsItem">
              <div className="label">$1651.57</div>
              <div className="value">$276.96M</div>
            </div>
            <div className="statisticsItem">
              <div className="label">24h Vol</div>
              <div className="value">$138.25M</div>
            </div>
          </div>
        </div>
        <div className="RecordTable">
         <Table dataSource={dataSource} pagination={false} columns={RecordColumns} />
         <div className="MoreBtn flexCenter">{'MORE >'}</div>
        </div>
      </div>
      <Modal open={isWithdrawModalOpen} onCancel={()=>{setIsWithdrawModalOpen(false)}}  closable={false} footer={null} wrapClassName="StakeModal" width={650}>
        <div className="ModalTitle">Transaction confirmed</div>
        <div className="InfoRow">
          <div className="label">Address</div>
          <div className="value">0x4c23e7071F45782e827da35C7c7153763D7113f2</div>
        </div>
        <div className="InfoRow">
          <div className="label">Amount</div>
          <div className="value">158626 eLFT</div>
        </div>
        <div className="BtnRow">
          <div className="Btn1 flexCenter">Confirm</div>
          <div className="Btn2 flexCenter">Cancel</div>
        </div>
      </Modal>
      <Modal open={isDepositModalOpen} onCancel={()=>{setIsDepositModalOpen(false)}}  closable={false} footer={null} wrapClassName="StakeModal" width={650}>
        <div className="ModalTitle">Transaction confirmed</div>
        <div className="InfoRow InfoRowCenter">
          <div className="label">Amount</div>
          <div className="value">158626.2548 LFT</div>
        </div>
        <div className="BtnRow">
          <div className="Btn1 flexCenter">Confirm</div>
          <div className="Btn2 flexCenter">Cancel</div>
        </div>
      </Modal>
    </div>
  )
}
