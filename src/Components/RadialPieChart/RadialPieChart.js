import React from 'react'
import './style.scss'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { salesReportData } from '../../Data/SalesReportData';


const RadialPieChart = ({data}) => {

    const style = {
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    }

  return (
    <div className='radialPieChart'>
      <h4 className='chart-title'>Sales By Category</h4>
      <ResponsiveContainer width="99%" height={400}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={20} data={data}>
          <Tooltip 
            labelStyle={{display:'none'}}
            cursor={{fill:'none'}}
          />
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise
            dataKey="sales"
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RadialPieChart
