import React from 'react'
import './style.scss'

const Tab = ({value, title}) => {
  return (
    <div className='tab'>
        <div className='tabContainer'>
          <h3>{value}</h3>
          <p>{title}</p>
        </div>
    </div>
  )
}

export default Tab
