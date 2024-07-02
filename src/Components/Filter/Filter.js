import React from 'react'
import './style.scss'

const Filter = ({location, setLocation, month, fromDate, toDate, handleFromDateChange, handleToDateChange, handleMonthChange}) => {
  return (
    <div className='filter'>s
      <div className='filter'>
          <select
            name='location'
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value='' disabled>Select Location</option>
            <option value='US'>US</option>
            <option value='Madurai'>Madurai</option>
          </select>
          <input
            type='month'
            placeholder='Last Month'
            value={month}
            onChange={(e) => handleMonthChange(e.target.value)}
          />
          <input
            type='date'
            placeholder='From Date'
            value={fromDate}
            onChange={(e) => handleFromDateChange(e.target.value)}
          />
          <input
            type='date'
            placeholder='To Date'
            value={toDate}
            onChange={(e) => handleToDateChange(e.target.value)}
          /> 
      </div>
    </div>
  )
}

export default Filter
