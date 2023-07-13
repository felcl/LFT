import '../assets/css/Claim.scss'
import {Table} from 'antd'
export default function Claim() {
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
    <div className="Claim">
      <div className="Title">Claim</div>
      <div className="ClaimBox">
        <Table dataSource={dataSource} pagination={false} columns={columns} />
        <div className="ClaimTips">Claim these five stakes?</div>
        <div className="ClaimInfo">
          <div className="infoLabel">until the next release</div>
          <div className="infovalue">152:25:20</div>
        </div>
        <div className="ClaimInfo">
          <div className="infoLabel">Expected loss</div>
          <div className="infovalue">$158626</div>
        </div>
        <div className="btnRow">
          <div className="btn1 flexCenter">Confirm</div>
          <div className="btn2 flexCenter">Cancel</div>
        </div>
      </div>
    </div>
  )
}
