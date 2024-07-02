import React, { useState } from 'react'
import './style.scss'
import arrow from '../../Assests/san.svg'
import { transactionData } from '../../Data/TransactionData'
import SideNavBar from '../../Components/SideNavBar/SideNavBar'

const Transaction = () => {
  const [location, setLocation] = useState('')
  const [month, setMonth] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const data = transactionData

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = data.slice(firstIndex, lastIndex)
  const nPage = Math.ceil(data.length/recordsPerPage)
  const numbers = [...Array(nPage + 1).keys()].slice(1) 

  const prePage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }
 
  const nextPage = () => {
    if(currentPage < nPage){
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className='transactionReport'>
        <SideNavBar />
        <div className='transaction'>
        <h2>Transaction</h2>
        <div className='filter'>
            <select name='location' id='location' value={location} onChange={(e)=>setLocation(e.target.value)}>
                <option value='default' disabled>location</option>
                <option value='US'>US</option>
                <option value='madurai'>Madurai</option>
            </select>
            <input 
                type='month' 
                placeholder='Last Month' 
                value={month} 
                onChange={(e)=>setMonth(e.target.value)} 
                onFocus={(e) => e.target.value === '' ? e.target.type='month' : e.target.type='text'}
                onBlur={(e) => e.target.value === '' ? e.target.type='text' : e.target.type='month'}
            />
            <input type='date' placeholder='From Date' value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
            <input type='date' placeholder='To Date' value={toDate} onChange={(e)=>setToDate(e.target.value)} />
        </div>
        <div className='search'>
            <h3>Search</h3>
            <input type='text' />
        </div>

        <div className='transactionPagination'>
        <div className='pagination'>
            <div className='table'>
                <div className='tableHeader'>
                    <p className='header'>S.no</p>
                    <p className='header'>TransactionId</p>
                    <p className='header'>OrderId</p>
                    <p className='header'>Status</p>
                    <p className='header'>OrderType</p>
                    <p className='header'>Date</p>
                    <p className='header'>Time</p>
                    <p className='header'>Payment Mode</p>
                    <p className='header'>Customer Name</p>
                    <p className='header'>Total</p>
                    <p className='header'>Tax</p>
                    <p className='header'>Discount</p>
                    <p className='header'>DiscountCode</p>
                    <p className='header'>StaffName</p>
                    <p className='header'>Refund</p>
                    <p className='header'>RefundReasons</p>
                </div>
                <div className='tableBody'>
                    {records.map((item, index) => (
                        <div className='tableRow' key={index}>
                            <p className='tableCell'>{item.sno}</p>
                            <p className='tableCell'>{item.transactionId}</p>
                            <p className='tableCell'>{item.orderId}</p>
                            <p className='tableCell'>{item.status}</p>
                            <p className='tableCell'>{item.orderType}</p>
                            <p className='tableCell'>{item.date}</p>
                            <p className='tableCell'>{item.time}</p>
                            <p className='tableCell'>{item.paymentMode}</p>
                            <p className='tableCell'>{item.customerName}</p>
                            <p className='tableCell'>{item.total}</p>
                            <p className='tableCell'>{item.tax}</p>
                            <p className='tableCell'>{item.discount}</p>
                            <p className='tableCell'>{item.discountCode}</p>
                            <p className='tableCell'>{item.staffName}</p>
                            <p className='tableCell'>{item.refund}</p>
                            <p className='tableCell'>{item.refundReason}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='paginationCursor'>
                <ul className='pagenationContainer'>
                    {currentPage > 1 && <li className='page-item'>
                        <img className='leftArrow' src={arrow} alt='' onClick={prePage}/>
                    </li>}
                    <li>Page {currentPage} - {nPage}</li>
                    <li className='page-item'>
                        <img src={arrow} alt='' onClick={nextPage}/>
                    </li>
                 </ul>
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Transaction
