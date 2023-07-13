import { useState } from 'react'
import '../assets/css/Earn.scss'
import schedule from '../assets/img/schedule.png'
export default function Earn() {
  const [scheduleValue,setscheduleValue] = useState(30)
  return (
    <div className="Earn">
      <div className="Title">Earn</div>
      <div className="scheduleBox">
        <img src={schedule} alt="" style={{'--width':scheduleValue + '%'}} />
        <div className="schedule">
          <div className="scheduleValue" style={{width:scheduleValue + '%'}}></div>
        </div>
      </div>
    </div>
  )
}
