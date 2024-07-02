import React, { useState } from 'react'
import './style.scss'
import Tab from '../../Components/Tab/Tab'
import SideNavBar from '../../Components/SideNavBar/SideNavBar'
import { invoiceRange, paymentModes } from '../../Data/EODReport'
import { salesCategory } from '../../Data/EODReport'
import { completedOrders } from '../../Data/EODReport'
import { cancelledOrders } from '../../Data/EODReport'
import { nonChargableOrders } from '../../Data/EODReport'
import { deliveryOrders } from '../../Data/EODReport'
import { paymentBreakDown } from '../../Data/EODReport'

const EODReport = () => {
    
  const [Date, setDate] = useState('')
  const [location, setLocation] = useState('')

  return (
    <div className='eod'>
        <SideNavBar />
        <div className='eodReport'>
        <h2>EOD Report</h2>
        <div className='filter'>
            <select name='location' id='location' value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value='default' disabled>Location</option>
                <option value='US'>US</option>
                <option value='madurai'>Madurai</option>
            </select>
            <input type='date' placeholder='Date' value={Date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className='summary'>
            <h3>Invoice</h3>
            <div className='summaryBox'>
                <Tab value={invoiceRange.range} title={invoiceRange.title} />
            </div>
        </div>

        <div className='summary'>
            <h3>Sales By Category</h3>
            <div className='summaryBox'>
            {salesCategory.map(data => 
                <Tab value={data.price} title={data.food} />
            )}
             </div>
        </div>

        <div className='summary'>
            <h3>Completed Orders</h3>
            <div className='summaryBox'>
                {completedOrders.map(data => 
                    <Tab value={data.value} title={data.title} />
                )}
            </div>
        </div>

        <div className='summary'>
            <h3>Cancelled Orders</h3>
            <div className='summaryBox'>
                {cancelledOrders.map(data => 
                    <Tab value={data.value} title={data.title} />
                )}
            </div>
        </div>

        <div className='summary'>
            <h3>Non-chargable Orders</h3>
            <div className='summaryBox'>
                {nonChargableOrders.map(data => 
                    <Tab value={data.value} title={data.title} />
                )}
            </div>
        </div>

        <div className='summary'>
            <h3>Delivery Orders</h3>
            <div className='summaryBox'>
                {deliveryOrders.map(data => 
                    <Tab value={data.value} title={data.title} />
                )}
            </div>
        </div>

        <div className='summary'>
            <h3>Payment modes</h3>
            <div className='summaryBox'>
                {paymentModes.map(data => 
                    <Tab value={data.value} title={data.title} />
                )}
            </div>
        </div>

        <div className='summary'>
            <h3>Payment breakdown</h3>
            <div className='summaryBox'>
                {paymentBreakDown.map(data => 
                    <Tab value={data.value} title={data.title} />
                )}
            </div>
        </div>
    </div>
    </div>
  )
}

export default EODReport
