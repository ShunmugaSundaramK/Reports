import React, { useEffect, useState } from 'react'
import LineChart from '../../Components/LineCharts/LineCharts'
import './style.scss'
import SideNavBar from '../../Components/SideNavBar/SideNavBar'
import { data } from '../../Data/ExpenseReportData';


const ProcessedInventory = () => {
  const [location, setLocation] = useState('Branch1')
  const [month, setMonth] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const [selectedItems, setSelectedItems] = useState(['Vegetable']);
  const [filteredLineChartData, setFilteredLineChartData] = useState({ vegetable: [], fruit: [] });


  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== value));
    }
  }

  useEffect(() => {
    const getLastMonth = () => {
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const year = lastMonth.getFullYear();
      const month = (lastMonth.getMonth() + 1).toString().padStart(2, '0');
      return `${year}-${month}`;
    };

    setMonth(getLastMonth())
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
      }
    }

    const filteredData = filterLineChartData(data, location, month, fromDate, toDate);
    setFilteredLineChartData(filteredData)
  }, [location, month, fromDate, toDate])

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value)
    setFromDate('')
    setToDate('')
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
    setMonth('');
  }

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
    setMonth('');
  }

  return (
    <div className='piReport'>
        <SideNavBar />
        <div className='processedInventory'>
        <h2>Processed Inventory</h2>
        <div className='filter'>
            <select name='location' id='location' value={location} onChange={handleLocationChange}>
                <option value='default' disabled>location</option>
                <option value='Branch1'>Branch1</option>
                <option value='Branch2'>Branch2</option>
            </select>
            <input 
                type='month' 
                placeholder='Last Month' 
                value={month} 
                onChange={handleMonthChange}
            />
            <input type='date' placeholder='From Date' value={fromDate} onChange={handleFromDateChange} />
            <input type='date' placeholder='To Date' value={toDate} onChange={handleToDateChange} />
        </div> 
        <div className='insights'>
            <h3>Insights</h3>
            <div className='insightsContainer'>
                <div className='leftBox'>23 OverSold Items</div>
                <div className='rightBox'>
                    <div className='c1'>
                        <p className='cHeader'>Item</p>
                        <p>Food Item 2</p>
                        <p>Food Item 3</p>
                        <p>Food Item 3</p>
                    </div>
                    <div className='c2'>
                        <p className='cHeader'>Count</p>
                        <p>34</p>
                        <p>34</p>
                        <p>34</p>
                    </div>
                    <div className='c3'>
                        <p className='cHeader'>Sold</p>
                        <p>45</p>
                        <p>64</p>
                        <p>47</p>
                    </div>
                </div>
            </div>
        </div> 

        <div className='consumed'>
            <h3>Consumed</h3>
            <div className='consumedBox'>
                <div className='consumedContainer'>
                    <div className='leftBox'>23 OverSold Items</div>
                    <div className='rightBox'>
                        <div className='c1'>
                            <p>Bun</p>
                            <p>Patty</p>
                            <p>Letuse</p>
                        </div>
                        <div className='c3'>
                            <p>45</p>
                            <p>64</p>
                            <p>47</p>
                        </div>
                    </div>
                </div>
                <div className='consumedContainer'>
                    <div className='leftBox'>23 OverSold Items</div>
                    <div className='rightBox'>
                        <div className='c1'>
                            <p>Bun</p>
                            <p>Patty</p>
                            <p>Letuse</p>
                        </div>
                        <div className='c3'>
                            <p>45</p>
                            <p>64</p>
                            <p>47</p>
                        </div>
                    </div>
                </div>
                <div className='consumedContainer'>
                    <div className='leftBox'>23 OverSold Items</div>
                    <div className='rightBox'>
                        <div className='c1'>
                            <p>Bun</p>
                            <p>Patty</p>
                            <p>Letuse</p>
                        </div>
                        <div className='c3'>
                            <p>45</p>
                            <p>64</p>
                            <p>47</p>
                        </div>
                    </div>
                </div>
            </div>            
        </div> 

      <LineChart selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} data={filteredLineChartData}/>
    </div>
    </div>
  )
}

export default ProcessedInventory
