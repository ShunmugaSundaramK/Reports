import React, { useEffect, useState } from 'react'
import './style.scss'
import Tab from '../../Components/Tab/Tab'
import LineChart from '../../Components/LineCharts/LineCharts'
import Pagination from '../../Components/Pagination/Pagination'
import SideNavBar from '../../Components/SideNavBar/SideNavBar'
import { paymentReport } from '../../Data/PaymentReportData';
import { data } from '../../Data/ExpenseReportData';


const OrderReport = () => {

  const [location, setLocation] = useState('Branch1')
  const [month, setMonth] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const [selectedItems, setSelectedItems] = useState(['Vegetable']);
  const [filteredLineChartData, setFilteredLineChartData] = useState({ vegetable: [], fruit: [] });


  useEffect(() => {
    const getLastMonth = () => {
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const year = lastMonth.getFullYear();
      const month = (lastMonth.getMonth() + 1).toString().padStart(2, '0');
      return `${year}-${month}`;
    };

    setMonth(getLastMonth());
  }, []);

  const formatDate = (dateStr) => {
    const parts = dateStr.split('/');
    const year = parts[2];
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const consolidateLineChartData = (data) => {
    const consolidatedData = {};
    data.forEach(item => {
      const key = `${item.label}-${item.location}`;
      if (!consolidatedData[key]) {
        consolidatedData[key] = { x: 0, y: 0 };
      }
      consolidatedData[key].x += item.x;
      consolidatedData[key].y += item.y;
    });

    return Object.entries(consolidatedData).map(([key, value]) => {
      const [label, location] = key.split('-');
      return { label, location, ...value };
    });
  };

  useEffect(() => {
    const filterLineChartData = (data, location, selectedMonth, fromDate, toDate) => {
      const selectedMonthDate = selectedMonth ? new Date(selectedMonth) : null;
      const selectedFromDate = fromDate ? new Date(fromDate) : null;
      const selectedToDate = toDate ? new Date(toDate) : null;

      const filterByDateRange = (item) => {
        const itemDate = new Date(item.date);
        return (
          item.location === location &&
          (!selectedMonth || (itemDate.getMonth() === selectedMonthDate.getMonth() && itemDate.getFullYear() === selectedMonthDate.getFullYear())) &&
          (!selectedFromDate || itemDate >= selectedFromDate) &&
          (!selectedToDate || itemDate <= selectedToDate)
        );
      };

      return {
        vegetable: consolidateLineChartData(data.vegetable.filter(filterByDateRange)),
        fruit: consolidateLineChartData(data.fruit.filter(filterByDateRange))
      };
    };

    const filteredData = filterLineChartData(data, location, month, fromDate, toDate);
    setFilteredLineChartData(filteredData);
  }, [location, month, fromDate, toDate]);


  const paginationData = paymentReport.filter(report => {
    const reportDate = formatDate(report.date);
    const matchesLocation = report.location === location;
    const matchesMonth = month === '' || reportDate.slice(0, 7) === month;
    return matchesLocation && matchesMonth 
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = paginationData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(paginationData.length / recordsPerPage);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== value));
    }
  }

  return (
    <div className='order'>
      <SideNavBar />
      <div className='orderReport'>
      <h2>Order Report</h2>

        <div className='filter'>
            <select
                name='location'
                id='location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            >
                <option value='default' disabled>Location</option>
                <option value='Branch1'>Branch1</option>
                <option value='Branch2'>Branch2</option>
            </select>
            <input
                type='month'
                placeholder='Last Month'
                value={month}
                onChange={(e) => setMonth(e.target.value)}
            />
            <input type='date' placeholder='From Date' value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
            <input type='date' placeholder='To Date' value={toDate} onChange={(e)=>setToDate(e.target.value)} />
        </div>

    <div className='tabs'>  
      <div className='summary'>
      <h3>Order Summary</h3>
        <div className='tabContainer'>
          <div className='aTab'>
            <div className='leftBox'>
              <p>₹ 45,333.33</p>
              <p>Total Sales</p>
            </div>
            <div className='rightBox'>
              <div className='head'>
                <p>Dine In</p>
                <p>Pick up</p>
                <p>Delivery</p>
              </div>
              <div className='body'>
                <p>₹ 20,000</p>
                <p>₹ 20,000</p>
                <p>₹ 5,333.33</p>
              </div>
            </div>
          </div>
          <div className='aTab'>
            <div className='leftBox'>
              <p>₹ 45,333.33</p>
              <p>Total Sales</p>
            </div>
            <div className='rightBox'>
              <div className='head'>
                <p>Dine In</p>
                <p>Pick up</p>
                <p>Delivery</p>
              </div>
              <div className='body'>
                <p>₹ 20,000</p>
                <p>₹ 20,000</p>
                <p>₹ 5,333.33</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='summary'>
      <div className='summaryBox'>
          <Tab value={'₹ 200'} title={'Starter'}/>
          <Tab value={'₹ 200'} title={'Biriyani'}/>
          <Tab value={'₹ 200'} title={'South Indian'}/>
      </div>
    </div>

    <div className='summary'>
        <h3>Most Orders</h3>
        <div className='summaryBox'>
            <Tab value={'₹ 200'} title={'Starter'}/>
            <Tab value={'₹ 200'} title={'Biriyani'}/>
            <Tab value={'₹ 200'} title={'Biriyani'}/>
            <Tab value={'₹ 200'} title={'Biriyani'}/>
            <Tab value={'₹ 200'} title={'Biriyani'}/>
            <Tab value={'₹ 200'} title={'South Indian'}/>
        </div>
    </div>

    <div className='tabs'>  
      <div className='summary'>
      <h3>Order Summary</h3>
        <div className='tabContainer'>
          <div className='aTab'>
            <div className='leftBox'>
              <p>₹ 45,333.33</p>
              <p>Total Sales</p>
            </div>
            <div className='rightBox'>
              <div className='head'>
                <p>Dine In</p>
                <p>Pick up</p>
                <p>Delivery</p>
              </div>
              <div className='body'>
                <p>₹ 20,000</p>
                <p>₹ 20,000</p>
                <p>₹ 5,333.33</p>
              </div>
            </div>
          </div>

          <div className='aTab'>
            <div className='leftBox'>
              <p>₹ 45,333.33</p>
              <p>Total Sales</p>
            </div>
            <div className='rightBox'>
              <div className='head'>
                <p>Dine In</p>
                <p>Pick up</p>
                <p>Delivery</p>
              </div>
              <div className='body'>
                <p>₹ 20,000</p>
                <p>₹ 20,000</p>
                <p>₹ 5,333.33</p>
              </div>
            </div>
          </div>

          <div className='aTab'>
            <div className='leftBox'>
              <p>₹ 45,333.33</p>
              <p>Total Sales</p>
            </div>
            <div className='rightBox'>
              <div className='head'>
                <p>Dine In</p>
                <p>Pick up</p>
                <p>Delivery</p>
              </div>
              <div className='body'>
                <p>₹ 20,000</p>
                <p>₹ 20,000</p>
                <p>₹ 5,333.33</p>
              </div>
            </div>
          </div>

          <div className='aTab'>
            <div className='leftBox'>
              <p>₹ 45,333.33</p>
              <p>Total Sales</p>
            </div>
            <div className='rightBox'>
              <div className='head'>
                <p>Dine In</p>
                <p>Pick up</p>
                <p>Delivery</p>
              </div>
              <div className='body'>
                <p>₹ 20,000</p>
                <p>₹ 20,000</p>
                <p>₹ 5,333.33</p>
              </div>
            </div>
          </div>

          <div className='aTab'>
            <div className='leftBox'>
              <p>₹ 45,333.33</p>
              <p>Total Sales</p>
            </div>
            <div className='rightBox'>
              <div className='head'>
                <p>Dine In</p>
                <p>Pick up</p>
                <p>Delivery</p>
              </div>
              <div className='body'>
                <p>₹ 20,000</p>
                <p>₹ 20,000</p>
                <p>₹ 5,333.33</p>
              </div>
            </div>
          </div>

          <div className='aTab'>
            <div className='leftBox'>
              <p>₹ 45,333.33</p>
              <p>Total Sales</p>
            </div>
            <div className='rightBox'>
              <div className='head'>
                <p>Dine In</p>
                <p>Pick up</p>
                <p>Delivery</p>
              </div>
              <div className='body'>
                <p>₹ 20,000</p>
                <p>₹ 20,000</p>
                <p>₹ 5,333.33</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination 
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      records={records}
      nPage={nPage}
    />
    <LineChart selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} data={filteredLineChartData}/>
    </div>
    </div>
  )
}

export default OrderReport
