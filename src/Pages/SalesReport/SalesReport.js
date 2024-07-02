import React, { useEffect, useState } from 'react'
import './style.scss'
import LineChart from '../../Components/LineCharts/LineCharts'
import BarChart from '../../Components/BarChart/BarChart'
import Pagination from '../../Components/Pagination/Pagination'
import RadialPieChart from '../../Components/RadialPieChart/RadialPieChart'
import Tab from '../../Components/Tab/Tab'
import SideNavBar from '../../Components/SideNavBar/SideNavBar'
import { paymentReport } from '../../Data/PaymentReportData'
import { salesReportData } from '../../Data/SalesReportData';
import { barChartData, data } from '../../Data/ExpenseReportData';
import { salesInsight } from '../../Data/SalesReportData'


const SalesReport = () => {

  const [location, setLocation] = useState('Branch1')
  const [month, setMonth] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [filteredBarChartData, setFilteredBarChartData] = useState(barChartData);
  const [selectedItems, setSelectedItems] = useState(['Vegetable'])
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

  const formatDate = (dateStr) => {
    const parts = dateStr.split('/');
    const year = parts[2];
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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

  const consolidateBarChartData = (data, fromDate, toDate) => {
    const selectedFromDate = fromDate ? new Date(fromDate) : null;
    const selectedToDate = toDate ? new Date(toDate) : null;
  
    const consolidatedData = data.map(category => {
      const consolidatedPoints = category.dataPoints.reduce((acc, point) => {
        const pointLocation = point.locations.find(loc => loc.name === location);
        const pointDate = pointLocation ? new Date(pointLocation.date) : null;
  
        if (
          (!selectedFromDate || (pointDate && pointDate >= selectedFromDate)) &&
          (!selectedToDate || (pointDate && pointDate <= selectedToDate)) &&
          typeof point.y === 'number'
        ) {
          const existingEntry = acc.find(entry => entry.label === category.label && entry.month === pointDate.getMonth());
          if (existingEntry) {
            existingEntry.y += point.y;
          } else {
            acc.push({
              label: category.label,
              month: pointDate.getMonth(),
              y: point.y
            });
          }
        }
        return acc;
      }, []);
  
      const dataPointsWithLabel = consolidatedPoints.map(point => ({
        label: point.label,
        y: point.y
      }));
  
      return {
        ...category,
        dataPoints: dataPointsWithLabel
      };
    });
  
    return consolidatedData;
  };
  
  useEffect(() => {
    const filteredData = consolidateBarChartData(barChartData, fromDate, toDate);
    setFilteredBarChartData(filteredData);
  }, [location, fromDate, toDate]);

  return (
    <div className='sales'>
      <SideNavBar />
      <div className='salesReport'>
      <h2>Sales Report</h2>

    <div className='filter'>
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
      <h3>Sales Insights</h3>
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

        <div className='summaryBoxes'>
            {salesInsight.map(data => 
              <Tab value={data.value} title={data.title}/>
            )}
        </div>
      </div>
    </div>

    <LineChart selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} data={filteredLineChartData}/>
    <BarChart data={filteredBarChartData}/>
    <RadialPieChart data={salesReportData} />
    <Pagination 
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      records={records}
      nPage={nPage}
    /> 
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

export default SalesReport
