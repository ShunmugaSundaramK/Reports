import React, { useEffect, useState } from 'react';
import './style.scss';
import LineChart from '../../Components/LineCharts/LineCharts';
import BarChart from '../../Components/BarChart/BarChart';
import Tab from '../../Components/Tab/Tab';
import SideNavBar from '../../Components/SideNavBar/SideNavBar';
import { data, barChartData } from '../../Data/ExpenseReportData';

const ExpenseReport = () => {
  const [location, setLocation] = useState('Branch1');
  const [month, setMonth] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedItems, setSelectedItems] = useState(['Vegetable']);
  const [filteredBarChartData, setFilteredBarChartData] = useState(barChartData);
  const [filteredLineChartData, setFilteredLineChartData] = useState({ vegetable: [], fruit: [] });

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

  const consolidateBarChartData = (data, fromDate, toDate) => {
    const selectedFromDate = fromDate ? new Date(fromDate) : null;
    const selectedToDate = toDate ? new Date(toDate) : null;
  
    // Collect all unique labels from all categories
    const allLabels = data.reduce((labels, category) => {
      category.dataPoints.forEach(point => {
        if (!labels.includes(point.label)) {
          labels.push(point.label);
        }
      });
      return labels;
    }, []);
  
    const consolidatedData = data.map(category => {
      const dataPoints = allLabels.map(label => ({
        label,
        y: 0 
      }));
  
      category.dataPoints.forEach(point => {
        const pointLocation = point.locations.find(loc => loc.name === location);
        const pointDate = pointLocation ? new Date(pointLocation.date) : null;
  
        if (
          (!selectedFromDate || (pointDate && pointDate >= selectedFromDate)) &&
          (!selectedToDate || (pointDate && pointDate <= selectedToDate)) &&
          typeof point.y === 'number'
        ) {
          const index = dataPoints.findIndex(dp => dp.label === point.label);
          if (index !== -1) {
            dataPoints[index].y += point.y;
          }
        }
      });
  
      return {
        ...category,
        dataPoints
      }
    })
  
    return consolidatedData;
  }
  
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

  useEffect(() => {
    const filteredData = consolidateBarChartData(barChartData, fromDate, toDate);
    setFilteredBarChartData(filteredData);
  }, [location, fromDate, toDate]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setFromDate('');
    setToDate('');
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
    setMonth('');
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
    setMonth('');
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== value));
    }
  }


  return (
    <div className='expense'>
      <SideNavBar />
      <div className='expenseReport'>
        <h2>Expense Report</h2>
        <div className='filter'>
          <select name='location' id='location' value={location} onChange={handleLocationChange}>
            <option value='default' disabled>Location</option>
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
        <div className='summary'>
          <h3>Summary</h3>
          <div className='summaryBox'>
            <Tab value={'₹ 20000'} title={'Total Sales'} />
            <Tab value={'₹ 200'} title={'Total Revenue'} />
            <Tab value={'₹ 200'} title={'Total Expense'} />
          </div>
        </div>
        <LineChart selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} data={filteredLineChartData} />
        <BarChart data={filteredBarChartData} />
      </div>
    </div>
  );
};

export default ExpenseReport;
