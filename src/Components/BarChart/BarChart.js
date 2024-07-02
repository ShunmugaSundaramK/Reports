import React, { useRef } from 'react';
import './style.scss';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  const toggleDataSeries = (e) => {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false
    } else {
      e.dataSeries.visible = true
    }
    chartRef.current.render()
  }

  const options = {
    animationEnabled: true,
    backgroundColor: "#222b3c",
    axisX: {
      title: 'Total - $134',
      titleFontSize: 14,
      titleFontColor: "white",
      labelFontColor: "white",
      tickColor: "white"
    },
    axisY: {
      title: 'Expense',
      includeZero: true,
      prefix: '$',
      suffix: 'k',
      titleFontSize: 14,
      titleFontColor: "white",
      labelFontColor: "white",
      tickColor: "white"
    },
    toolTip: {
      shared: true,
      reversed: true,
    },
    legend: {
      verticalAlign: 'center',
      horizontalAlign: 'right',
      reversed: true,
      cursor: 'pointer',
      itemclick: toggleDataSeries,
      fontColor: "white"
    },
    data: data.map(series => ({
      ...series,
      dataPoints: series.dataPoints.map(point => ({
        label: point.label,
        y: point.y,
        location: point.location,
        date: new Date(point.date) 
      })),
      // dataPointWidth: 30 
    }))
  }

  return (
    <div className='barChart'>
      <CanvasJSChart options={options} onRef={(ref) => (chartRef.current = ref)} />
    </div>
  )
}

export default BarChart;
