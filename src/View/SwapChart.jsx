import '../assets/style/SwapChart.scss'
import {useNavigate} from 'react-router-dom'
import  dayjs from 'dayjs'
import relativeTime  from 'dayjs/plugin/relativeTime'
import Axios from '../axios'
import Table from 'antd/es/table';
import { Empty } from 'antd';
import { AddrHandle} from '../utils/tool'
import { createChart, ColorType } from 'lightweight-charts';
import { useRef, useEffect, useState } from 'react'
import JTReturn from '../assets/image/JTReturn.png'
export default function SwapChart() {
    dayjs.extend(relativeTime)
    const navigate = useNavigate();
    let RecordList = [].fill(1)
    RecordList = new Array(3).fill({});
    const [swapRecord,setSwapRecord] = useState([])
    const [swapData,setSwapData] = useState(null)
    const  [scrollObj,setScrollObj] = useState({})
    const backgroundColor = 'white'
    const lineColor = '#EB6120'
    const textColor = '#767676'
    const areaTopColor = '#FBE0D3'
    const areaBottomColor = '#fff'
    const chart = useRef();
    // const [ChartData,setChartData] = useState([])
	const chartContainerRef = useRef();
    const RunderChart = (ChartData)=>{
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth, });
            chart.priceScale('right').applyOptions({
                borderColor:'#fff',
                fontSize: 12,
            });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
            LineType:1,
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    visible: false,
                },
            },
            rightPriceScale: {
                visible: true,
                scaleMargins: {
                    top: 0.3,
                    bottom: 0.25,
                },
                borderVisible: false,
            },
            timeScale:{
                borderVisible: false,
            },
            KineticScroll:{
                touch:false,
                mouse:false
            }
        });
        chart.timeScale().fitContent();

        const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor ,borderColor: '#fff',});

        // chart.priceScale('right').applyOptions({
        //     borderColor:'#fff'
        // });
        // chart.timeScale('').applyOptions({
        //     borderColor:'#fff'
        // });
        // chart.current = newSeries
        newSeries.setData(ChartData);
        // newSeries.setData(data);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }
    // eslint-disable-next-line no-sparse-arrays
    const swapTypeEnum = [,'Buy','Sell']
    useEffect(()=>{
        if(document.body.clientWidth <= 700){
            setScrollObj({
                x:600
            })
        }
    },[])
    useEffect(()=>{
        Axios.get('/swap/swapData').then(res=>{
            if(res.data.data){
                setSwapData(res.data.data)
            }
            console.log(res,"平台统计数据")
        })
        Axios.get('/swap/swapKline').then(res=>{
            RunderChart([
                { time: '2018-12-22', value: 32.51 },
                { time: '2018-12-23', value: 31.11 },
                { time: '2018-12-24', value: 27.02 },
                { time: '2018-12-25', value: 27.32 },
                { time: '2018-12-26', value: 35.67 },
                { time: '2018-12-27', value: 38.89 },
                { time: '2018-12-28', value: 38.46 },
                { time: '2018-12-29', value: 40.92 },
                { time: '2018-12-30', value: 37.68 },
                { time: '2018-12-31', value: 39.67 },
                { time: '2019-01-01', value: 39.67 },
                { time: '2019-01-02', value: 42.31 },
            ])
        })
        Axios.get('/swap/swapRecord').then(res=>{
            if(res.data.data){
                setSwapRecord(res.data.data)
            }
            console.log(res,"平台交易所数据")
        })
    },[])
    const columns = [
        {
          title: 'Time',
          dataIndex: 'createTime',
          key: 'Time',
        //   render:(createTime)=>dayjs(createTime).fromNow()
        },
        {
          title: 'Type',
          dataIndex: 'swapType',
          key: 'Type',
          align:'center',
          render:(swapType,row)=><span  className={row.swapType === 1 ? 'buyColor':'sellColor'}>{swapTypeEnum[swapType]}</span>
        },
        {
          title: 'Amount',
          dataIndex: 'swapType',
          key: 'Amount',
          align:'center',
          render:(swapType,row)=><span className={row.swapType === 1 ? 'buyColor':'sellColor'}>{row.swapType === 2 ? '- ' + row.token0Amount + ' ' + row.token0Name:'-' + row.token1Amount + ' ' + row.token1Name}</span>
        },
        {
          title: 'User',
          dataIndex: 'userAddress',
          key: 'User',
          align:'right',
          render:(userAddress)=>AddrHandle(userAddress, 7, 6)
        },
      ];
  return (
    <div className="SwapChart">
        <div className="Title">
            <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
            <span></span>
        </div>
        <div className="chartBox">
            <div className="ChartInfo">
                <div className="infoItem">
                    <div className="label">24h High</div>
                    {swapData && <div className="value">${swapData.high}</div>}
                </div>
                <div className="infoItem">
                    <div className="label">24h Low</div>
                    {swapData && <div className="value">${swapData.low}</div>}
                </div>
                <div className="infoItem">
                    <div className="label">TVL（USD）</div>
                    {swapData && <div className="value">${swapData.tvl}</div>}
                </div>
                <div className="infoItem">
                    <div className="label">24h Vol</div>
                    {swapData && <div className="value">${swapData.vol}</div>}
                </div>
            </div>
            <div className="Chart" ref={chartContainerRef} />
        </div>
        <div className="Title">
            <span></span>
            <span>History</span>
            <span></span>
        </div>
        <div className="HistoryBox">
            {/* <div className="th">
                <div>Time</div>
                <div>Type</div>
                <div>Amount</div>
                <div>User</div>
            </div> */}
            {
                swapRecord.length >0 ?
                swapRecord.map((item,index)=><div className='tr' key={index}>
                    <div>{dayjs(item.createTime).fromNow() }</div>
                    <div>{swapTypeEnum[item.swapType]}</div>
                    <div>{
                        item.swapType === 2 ? '- ' + item.token0Amount + ' ' + item.token0Name:'-' + item.token1Amount + ' ' + item.token1Name
                        }</div>
                    <div>{AddrHandle(item.userAddress, 7, 6)}</div>
                </div>)
                // <Table columns={columns} rowKey={columns => columns.id} dataSource={swapRecord} pagination={false}  scroll={scrollObj} />
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>
    </div>
  )
}