import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart , Area,  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import orderService from '../../../Services/order.service';

const recentOrders = [
  { name: "JAN", value: "0" },
  { name: "FEB", value: "0" },
  { name: "MAR", value: "0" },
  { name: "APR", value: "0" },
  { name: "MAY", value: "0" },
  { name: "JUN", value: "0" },
  { name: "JUL", value: "0" },
  { name: "AUG", value: "0" },
  { name: "SEP", value: "0" },
  { name: "OCT", value: "0" },
  { name: "NOV", value: "0" },
  { name: "DEC", value: "0" }
];

function Recentorderchart() {

  const [recentOrdersData , setRecentOrdersData] = useState();

  const getOrderChartData = async()=>{
    try{
      const res = await orderService.getRecentOrderChartData();
      if(res.status===200){
        console.log("recenetOrder Chart Data" , res.data)
        setRecentOrdersData(res.data);
        
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
   getOrderChartData();
  },[]);

  return (
    <div style={{ width: '100%', height:'300px' }}>
      <ResponsiveContainer>
       { recentOrdersData && <AreaChart   data={recentOrdersData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="monthName" tick={{ fontSize: 14, fontWeight: 'bold', fill: '#cbb9b9' }} />
          <YAxis tick={{ fontSize: 14, fontWeight: 'bold', fill: '#cbb9b9' }}/>
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#5c32a8" fill="#c7d5f0" strokeWidth={3} />
        </AreaChart>}
      </ResponsiveContainer>
    </div>
  );
}

export default Recentorderchart;
