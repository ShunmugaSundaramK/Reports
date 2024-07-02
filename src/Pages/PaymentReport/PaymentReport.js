import React, { useEffect, useState } from 'react';
import './style.scss';
import PieChart from '../../Components/PieCharts/PieChart';
import Pagination from '../../Components/Pagination/Pagination';
import SideNavBar from '../../Components/SideNavBar/SideNavBar';
import { dataPoints } from '../../Data/PaymentReportData';
import { paymentReport } from '../../Data/PaymentReportData';

const PaymentReport = () => {

  const [location, setLocation] = useState('Branch1')
  const [month, setMonth] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [amount, setAmount] = useState('$')

  useEffect(() => {
    const getLastMonth = () => {
      const today = new Date()
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const year = lastMonth.getFullYear()
      const month = (lastMonth.getMonth() + 1).toString().padStart(2, '0')
      return `${year}-${month}`
    }

    setMonth(getLastMonth())
  }, [])

  const formatDate = (dateStr) => {
    const parts = dateStr.split('/')
    const year = parts[2]
    const month = parts[0].padStart(2, '0')
    const day = parts[1].padStart(2, '0')
    return `${year}-${month}-${day}`
  };

  const handleMonthChange = (value) => {
    setMonth(value)
    setFromDate('')
    setToDate('')
  }

  const handleFromDateChange = (value) => {
    setFromDate(value)
    setMonth('')
  }

  const handleToDateChange = (value) => {
    setToDate(value)
    setMonth('')
  }

  const filteredData = dataPoints.filter(point => {
    const pointDate = formatDate(point.date);
    const matchesLocation = point.location === location;
    const matchesMonth = month === '' || pointDate.slice(0, 7) === month;
    const matchesDateRange =
      (!fromDate || pointDate >= fromDate) &&
      (!toDate || pointDate <= toDate);

    return matchesLocation && matchesMonth && matchesDateRange;
  });

  const groupedData = filteredData.reduce((acc, point) => {
    const key = `${point.label}-${point.location}`;
    acc[key] = (acc[key] || 0) + point.y;
    return acc;
  }, {});

  const pieChartData = Object.entries(groupedData).map(([key, value]) => {
    const [label, location] = key.split('-');
    return { label, location, y: value };
  });

  const paginationData = paymentReport.filter(report => {
    const reportDate = formatDate(report.date)
    const matchesLocation = report.location === location
    const matchesMonth = month === '' || reportDate.slice(0, 7) === month
    return matchesLocation && matchesMonth 
  })

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = paginationData.slice(firstIndex, lastIndex)
  const nPage = Math.ceil(paginationData.length / recordsPerPage)

  return (
    <div className='payment'>
      <SideNavBar />
      <div className='paymentReport'>
        <h2>PAYMENT REPORT</h2>
        <div className='filter'>
          <div className='selectBox'>
            <select
              name='location'
              id='location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value='' disabled>Select Location</option>
              <option value='Branch1'>Branch1</option>
              <option value='Branch2'>Branch2</option>
            </select>
          </div>
          <div className='inputBox'>
            <input
              type='month'
              placeholder='Last Month'
              value={month}
              onChange={(e) => handleMonthChange(e.target.value)}
          />
          </div>
          <div className='inputBox'>
            <input
              type='date'
              placeholder='From Date'
              value={fromDate}
              onChange={(e) => handleFromDateChange(e.target.value)}
          />
          </div>
          <div className='inputBox'>
            <input
              type='date'
              placeholder='To Date'
              value={toDate}
              onChange={(e) => handleToDateChange(e.target.value)}
          />
          </div>
        </div>
        <PieChart dataPoints={pieChartData} amount={amount}/>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          records={records}
          nPage={nPage}
        />
      </div>
    </div>
  )
}

export default PaymentReport
