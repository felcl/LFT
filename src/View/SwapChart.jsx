import '../assets/style/SwapChart.scss'
import {useNavigate} from 'react-router-dom'
import { Empty } from 'antd';
import { createChart, ColorType } from 'lightweight-charts';
import { useRef, useEffect } from 'react'
import JTReturn from '../assets/image/JTReturn.png'

const initialData = [
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
];
export default function SwapChart() {
    const navigate = useNavigate();
    let RecordList = [].fill(1)
    RecordList = new Array(3).fill({});
    const data = initialData
    const backgroundColor = 'white'
    const lineColor = '#EB6120'
    const textColor = '#767676'
    const areaTopColor = '#FBE0D3'
    const areaBottomColor = '#fff'

	const chartContainerRef = useRef();
    useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth, });
                chart.priceScale('right').applyOptions({
                    borderColor:'#fff'
                });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
                LineType:2,
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
            chart.timeScale('').applyOptions({
                borderColor:'#fff'
            });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);
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
                    <div className="value">$1726.57</div>
                </div>
                <div className="infoItem">
                    <div className="label">24h Low</div>
                    <div className="value">$1651.57</div>
                </div>
                <div className="infoItem">
                    <div className="label">TVL（USD）</div>
                    <div className="value">$276.96M</div>
                </div>
                <div className="infoItem">
                    <div className="label">24h Vol</div>
                    <div className="value">$138.25M</div>
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
            <div className="th">
                <div>Time</div>
                <div>Type</div>
                <div>Amount</div>
                <div>User</div>
            </div>
            
            {
                RecordList.length >0 ?
                RecordList.map((item,index)=><div className='tr' key={index}>
                    <div>9 sec(s) ago</div>
                    <div>sell</div>
                    <div>-0.274 LFT</div>
                    <div>0xd75e7d1...a87d50</div>
                </div>)
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
            
        </div>
    </div>
  )
}