
import Canvas from '@antv/f2-react';
import { Chart, Line, Tooltip } from '@antv/f2';
import '../assets/style/Swap.scss'
import ChangeIcon from '../assets/image/ChangeIcon.png'

export default function Swap() {
    const data = [
        {
          date: '2017-06-05',
          value: 116,
        },
        {
          date: '2017-06-06',
          value: 129,
        },
        {
          date: '2017-06-07',
          value: 135,
        },
        {
          date: '2017-06-08',
          value: 86,
        },
        {
          date: '2017-06-09',
          value: 73,
        },
        {
          date: '2017-06-10',
          value: 85,
        },
        {
          date: '2017-06-11',
          value: 73,
        },
        {
          date: '2017-06-12',
          value: 68,
        },
        {
          date: '2017-06-13',
          value: 92,
        },
        {
          date: '2017-06-14',
          value: 130,
        },
        {
          date: '2017-06-15',
          value: 245,
        },
        {
          date: '2017-06-16',
          value: 139,
        },
        {
          date: '2017-06-17',
          value: 115,
        },
        {
          date: '2017-06-18',
          value: 111,
        },
        {
          date: '2017-06-19',
          value: 309,
        },
        {
          date: '2017-06-20',
          value: 206,
        },
        {
          date: '2017-06-21',
          value: 137,
        },
        {
          date: '2017-06-22',
          value: 128,
        },
        {
          date: '2017-06-23',
          value: 85,
        },
        {
          date: '2017-06-24',
          value: 94,
        },
        {
          date: '2017-06-25',
          value: 71,
        },
        {
          date: '2017-06-26',
          value: 106,
        },
        {
          date: '2017-06-27',
          value: 84,
        },
        {
          date: '2017-06-28',
          value: 93,
        },
        {
          date: '2017-06-29',
          value: 85,
        },
        {
          date: '2017-06-30',
          value: 73,
        },
        {
          date: '2017-07-01',
          value: 83,
        },
        {
          date: '2017-07-02',
          value: 125,
        },
        {
          date: '2017-07-03',
          value: 107,
        },
        {
          date: '2017-07-04',
          value: 82,
        },
        {
          date: '2017-07-05',
          value: 44,
        },
        {
          date: '2017-07-06',
          value: 72,
        },
        {
          date: '2017-07-07',
          value: 106,
        },
        {
          date: '2017-07-08',
          value: 107,
        },
        {
          date: '2017-07-09',
          value: 66,
        },
        {
          date: '2017-07-10',
          value: 91,
        },
        {
          date: '2017-07-11',
          value: 92,
        },
        {
          date: '2017-07-12',
          value: 113,
        },
        {
          date: '2017-07-13',
          value: 107,
        },
        {
          date: '2017-07-14',
          value: 131,
        },
        {
          date: '2017-07-15',
          value: 111,
        },
        {
          date: '2017-07-16',
          value: 64,
        },
        {
          date: '2017-07-17',
          value: 69,
        },
        {
          date: '2017-07-18',
          value: 88,
        },
        {
          date: '2017-07-19',
          value: 77,
        },
        {
          date: '2017-07-20',
          value: 83,
        },
        {
          date: '2017-07-21',
          value: 111,
        },
        {
          date: '2017-07-22',
          value: 57,
        },
        {
          date: '2017-07-23',
          value: 55,
        },
        {
          date: '2017-07-24',
          value: 60,
        },
      ];
    // const context = document.getElementById('container').getContext('2d');
    // const LineChart = (
    //     <Canvas>
    //         <Chart data={data}>
    //             <Interval x="genre" y="sold" />
    //         </Chart>
    //     </Canvas>
    // );
    // const chart = new Canvas(LineChart.props);
    // chart.render();
    return (
        <div className='Swap'>
            <div className="Title">Swap</div>
            <div className="SwapBox">
                <div className="Tabs">
                    <div className="tabItem tabItemActive">Swap</div>
                    <div className="tabItem">Buy</div>
                </div>
                <div className="putMain">
                    <div className="putRow">
                        <input type="text" />
                        <div className="token">
                            LFT
                        </div>
                    </div>
                    <img className="ChangeIcon" src={ChangeIcon} alt="" />
                    <div className="putRow">
                        <input type="text" />
                        <div className="token">
                            USDT
                        </div>
                    </div>
                </div>
                <div className="swapInfo">
                    <div className="increaseRow">
                        <div className="increaseText">1 ETH = 30.3079 AAVE ($1,866.92)</div>
                        <Canvas  width="350" height="80">
                            <Chart data={data}>
                                <Line x="date" y="value" />
                                <Tooltip />
                            </Chart>
                        </Canvas>
                        {/* <canvas id="container" width="350" height="80"></canvas> */}
                    </div>
                    <div className="InfoRow">
                        <div className="label">Network fee</div>
                        <div className="value">~$8.02</div>
                    </div>
                    <div className="InfoRow">
                        <div className="label">Price Impact</div>
                        <div className="value">-0.05%</div>
                    </div>
                    <div className="InfoRow">
                        <div className="label">Minimum output</div>
                        <div className="value">0.000501389 ETH</div>
                    </div>
                    <div className="InfoRow">
                        <div className="label">Expected output</div>
                        <div className="value">0.000526458 ETH</div>
                    </div>
                    <div className="InfoRow borderTop">
                        <div className="label">Order routing</div>
                        <div className="value">LFTswap API</div>
                    </div>
                </div>
                <div className="submit flexCenter">Connect wallet</div>
            </div>
            <div className="Record">
                {'Swap record >'}
            </div>
        </div>
    )
}
