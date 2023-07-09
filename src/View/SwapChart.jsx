import '../assets/style/SwapChart.scss'
import {useNavigate} from 'react-router-dom'
import  dayjs from 'dayjs'
import relativeTime  from 'dayjs/plugin/relativeTime'
import Axios from '../axios'
import { Empty,Table } from 'antd';
import { AddrHandle, dateFormat, NumSplic} from '../utils/tool'
import { createChart, ColorType } from 'lightweight-charts';
import { useRef, useEffect, useState } from 'react'
import JTReturn from '../assets/image/JTReturn.png'
import { useTranslation } from 'react-i18next'
export default function SwapChart() {
    dayjs.extend(relativeTime)
    const navigate = useNavigate();
    const { t } = useTranslation()
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
            localization: { // 设置x周时间格式
                dateFormat: "yyyy-MM-dd",
            },
            timeScale: {
                visible: !0,
                borderVisible: !1,
                secondsVisible: !1,
                tickMarkFormatter:(e)=>{
                    return dateFormat('YYYY-mm-dd',new Date(e*1000))
                }
            },
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
            // timeScale:{
            //     borderVisible: false,
            // },
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
        Axios.get('/swap/swapKline').then((res)=>{
            console.log(res,"折线数据")
            if(res.data.data){
                let dataArr = []
                res.data.data = res.data.data.sort(function(a,b){
                    return a.createTime - b.createTime
                })
                res.data.data.forEach(item=>{
                    if(!dataArr.find(element=>{
                        return element.createTime === item.createTime
                    })){
                        dataArr.push(item)
                    }
                })
                RunderChart(
                    dataArr.map(item=>{
                       return { time: item.createTime /1000, value: item.price }
                    })
                )
            }
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
          title: t('Time'),
          dataIndex: 'createTime',
          key: 'Time',
          render:(createTime)=>dayjs(createTime).fromNow()
        },
        {
          title: t('Type'),
          dataIndex: 'swapType',
          key: 'Type',
          align:'center',
          render:(swapType,row)=><span  className={row.swapType === 1 ? 'buyColor':'sellColor'}>{swapTypeEnum[swapType]}</span>
        },
        {
          title: t('Amount'),
          dataIndex: 'swapType',
          key: 'Amount',
          align:'center',
          render:(swapType,row)=><span className={row.swapType === 1 ? 'buyColor':'sellColor'}>{row.swapType === 2 ? '- ' + row.token0Amount + ' ' + row.token0Name:'-' + row.token1Amount + ' ' + row.token1Name}</span>
        },
        {
          title: t('User'),
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
                    <div className="label">{t('24hHigh')}</div>
                    {swapData && <div className="value">${NumSplic(swapData.high,6)}</div>}
                </div>
                <div className="infoItem">
                    <div className="label">{t('24hLow')}</div>
                    {swapData && <div className="value">${NumSplic(swapData.low,6)}</div>}
                </div>
                <div className="infoItem">
                    <div className="label">{t('TVL（USD）')}</div>
                    {swapData && <div className="value">${NumSplic(swapData.tvl,6)}</div>}
                </div>
                <div className="infoItem">
                    <div className="label">{t('24hVol')}</div>
                    {swapData && <div className="value">${NumSplic(swapData.vol,6)}</div>}
                </div>
            </div>
            <div className="Chart" ref={chartContainerRef} />
        </div>
        <div className="Title">
            <span></span>
            <span>{t('History')}</span>
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
                // swapRecord.map((item,index)=><div className='tr' key={index}>
                //     <div>{dayjs(item.createTime).fromNow() }</div>
                //     <div>{swapTypeEnum[item.swapType]}</div>
                //     <div>{
                //         item.swapType === 2 ? '- ' + item.token0Amount + ' ' + item.token0Name:'-' + item.token1Amount + ' ' + item.token1Name
                //         }</div>
                //     <div>{AddrHandle(item.userAddress, 7, 6)}</div>
                // </div>)
                <Table columns={columns} rowKey={columns => columns.id} dataSource={swapRecord} pagination={false}  scroll={scrollObj} />
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>
    </div>
  )
}