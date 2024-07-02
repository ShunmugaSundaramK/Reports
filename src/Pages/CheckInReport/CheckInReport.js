import React, { useEffect, useState } from 'react';
import './style.scss';
import Tab from '../../Components/Tab/Tab';
import LineChart from '../../Components/LineCharts/LineCharts';
import SideNavBar from '../../Components/SideNavBar/SideNavBar';
import { data } from '../../Data/ExpenseReportData';
import { checkInSummary, occupancy2 } from '../../Data/CheckInReport';
import { guestWaitingTime } from '../../Data/CheckInReport';
import { occupancy } from '../../Data/CheckInReport';
import { checkInQueue } from '../../Data/CheckInReport';

const CheckInReport = () => {
  const [location, setLocation] = useState('Branch1');
  const [month, setMonth] = useState('');
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
    const filterLineChartData = (data, location, selectedMonth) => {
      const selectedMonthDate = selectedMonth ? new Date(selectedMonth) : null;

      const filterByDateRange = (item) => {
        const itemDate = new Date(item.date);
        return (
          item.location === location &&
          (!selectedMonth || (itemDate.getMonth() === selectedMonthDate.getMonth() && itemDate.getFullYear() === selectedMonthDate.getFullYear()))
        );
      };

      return {
        vegetable: consolidateLineChartData(data.vegetable.filter(filterByDateRange)),
        fruit: consolidateLineChartData(data.fruit.filter(filterByDateRange)),
      };
    };

    const filteredData = filterLineChartData(data, location, month);
    setFilteredLineChartData(filteredData);
  }, [location, month]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== value));
    }
  };

  return (
    <div className='checkIn'>
      <SideNavBar />
      <div className='checkInReport'>
        <h2>Check - In Report</h2>
        <div className='filter'>
          <select name='location' id='location' value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value='default' disabled>Location</option>
            <option value='Branch1'>Branch1</option>
            <option value='Branch2'>Branch2</option>
          </select>
          <input
            type='month'
            placeholder='Select Month'
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div className='checkInSummary'>
          <h3>Check In Summary</h3>
          <div className='summaryBox'>
            {checkInSummary.map(data => 
              <Tab value={data.value} title={data.title} />
            )}
          </div>
        </div>
        <div className='checkInSummary'>
          <h3>Guest Waiting Time</h3>
          <div className='summaryBox'>
            {guestWaitingTime.map(data => 
              <Tab value={data.value} title={data.title} />
            )}
          </div>
        </div>
        <div className='checkInSummary'>
          <h3>Occupancy</h3>
          <div className='summaryBox'>
            {occupancy.map(data => 
              <Tab value={data.value} title={data.title} />
            )}
          </div>  
        </div>
        <div className='checkInSummary'>
          <div className='summaryBox'>
            {occupancy2.map(data => 
              <Tab value={data.value} title={data.title} />
            )}
          </div>
        </div>
        <div className='checkInSummary'>
          <h3>Section wise Check-in queue</h3>
          <div className='summaryBox'>
            {checkInQueue.map(data => 
              <Tab value={data.value} title={data.title} />
            )}
          </div>
        </div>
        <LineChart selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} data={filteredLineChartData} />
        <LineChart selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} data={filteredLineChartData} />
      </div>
    </div>
  );
};

export default CheckInReport;
