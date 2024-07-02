import React, { useState } from 'react';
import './style.scss';
import CanvasJSReact from '@canvasjs/react-charts';
import vector from '../../Assests/Vector.svg';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineChart = ({selectedItems, handleCheckboxChange, data}) => {

  const [showDropDown, setShowDropDown] = useState(false)

  const getDataPoints = () => {
    const result = []
    if (selectedItems.includes('Vegetable')) {
      result.push({
        type: 'line',
        toolTipContent: 'Day{x}: {y}%',
        showInLegend: true,
        name: 'Vegetable',
        dataPoints: data.vegetable,
      })
    }
    if (selectedItems.includes('Fruit')) {
      result.push({
        type: 'line',
        toolTipContent: 'Day{x}: {y}%',
        showInLegend: true,
        name: 'Fruit',
        dataPoints: data.fruit,
      })
    }
    return result
  }

  const options = {
    animationEnabled: true,
    theme: 'light1',
    backgroundColor: "#222b3c",
    axisY: {
      title: 'Spent On',
      prefix: '$',
      gridThickness: 0,
      titleFontSize: 14,
      titleFontColor: "white",
      labelFontColor: "white"
    },
    axisX: {
      title: 'Total - $134',
      interval: 1,
      gridThickness: 0,
      titleFontSize: 14,
      titleFontColor: "white",
      labelFontColor: "white",
    },
    legend: {
      horizontalAlign: 'center',
      verticalAlign: 'top',
      fontSize: 14,
      fontFamily: 'Arial',
      margin: 20, 
      fontColor: "white"
    },
    data: getDataPoints(),
  }

  return (
    <div className='chart-container'>
      <div className='dropDownbox'>
        <div className='dropdown' onClick={() => setShowDropDown(!showDropDown)}>
          <div className='selectedItem'>
            {selectedItems.join(', ')}
          </div>
          <img src={vector} className={showDropDown ? 'arrowDown' : 'arrowUp'} alt="toggle dropdown" />
        </div>
        {showDropDown && (
          <div className='dropdownContainer'>
            <div className='items'>
              <label>
                <input
                  className='checkbox'
                  value='Vegetable'
                  type='checkbox'
                  checked
                  disabled
                  onChange={handleCheckboxChange}
                />
                <p className='cPname'>Vegetable</p>
              </label>
              <label>
                <input
                  className='checkbox'
                  value='Fruit'
                  type='checkbox'
                  checked={selectedItems.includes('Fruit')}
                  onChange={handleCheckboxChange}
                />
                <p className='cPname'>Fruit</p>
              </label>
            </div>
          </div>
        )}
      </div>
      <CanvasJSChart options={options} />
    </div>
  )
}

export default LineChart;
