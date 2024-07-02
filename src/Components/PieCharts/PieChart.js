import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import './style.scss';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const convertToCSV = (data) => {
//   const headers = Object.keys(data[0]);
//   const rows = data.map(obj => headers.map(header => obj[header]).join(','));
//   return [headers.join(','), ...rows].join('\n');
// }

// const downloadFile = (content, fileName, contentType) => {
//   const blob = new Blob([content], { type: contentType })
//   const url = URL.createObjectURL(blob)
//   const a = document.createElement('a')
//   a.href = url
//   a.download = fileName
//   a.click()
//   URL.revokeObjectURL(url)
// }

// const downloadCSV = () => {
//   const csv = convertToCSV(dataPoints)
//   downloadFile(csv, 'data.csv', 'text/csv')
// }

// const downloadJSON = () => {
//   const json = JSON.stringify(dataPoints, null, 2)
//   downloadFile(json, 'data.json', 'application/json')
// }

const PieChart = ({dataPoints, amount}) => {

  const options = {
    animationEnabled: true,
    backgroundColor: "#222b3c",
  
    legend: {
      verticalAlign: "center", 
      horizontalAlign: "right",
      fontColor: "white",
    },
  
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: true,
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      indexLabelFontColor: "white",
      dataPoints: dataPoints,
      width: "50%",
    }]
  }
  return (
    <div className='pieChart'>
      <h3>Payments | Total = {amount} 1,23,000.00</h3>
      {/* <div className='downloadBtn'>
          <button onClick={downloadCSV}>Download CSV</button>
          <button onClick={downloadJSON}>Download JSON</button>
      </div>   */}
      <div className='chart'>
        <CanvasJSChart options={options} />   
      </div>
    </div>
  )
}

export default PieChart;
