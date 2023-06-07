import React from 'react'
import '../assets/style/Convert.scss'

export default function Convert() {
  return (
    <div className="Convert">
        <div className="Title">Convert</div>
        <div className="ConvertBox">
            <div className="label">From</div>
            <div className="put">
                <input type="text" />
                <span className="Max"></span>
            </div>
        </div>
    </div>
  )
}
