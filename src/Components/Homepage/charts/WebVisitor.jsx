import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const recentOrders = [
  { name: "JAN", value: "500" },
  { name: "FEB", value: "850" },
  { name: "MAR", value: "300" },
  { name: "APR", value: "450" },
  { name: "MAY", value: "900" },
  { name: "JUN", value: "670" },
  { name: "JUL", value: "780" },
  { name: "AUG", value: "620" },
  { name: "SEP", value: "430" },
  { name: "OCT", value: "560" },
  { name: "NOV", value: "710" },
  { name: "DEC", value: "980" }
];

function WebVisitor() {
  return (
    <div style={{ width: '100%', height:'320px' }}>
      <ResponsiveContainer>
        <BarChart data={recentOrders} margin={{ top: 5, right: 5, bottom: 5, left: 0 }} animation={{ duration: 3000 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" tick={{ fontSize: 14, fontWeight: 'bold', fill: '#cbb9b9' }} />
          <YAxis tick={{ fontSize: 14, fontWeight: 'bold', fill: '#cbb9b9' }} />
          <Tooltip />
          <Legend />
          <Bar type="monotone" dataKey="value" width="5px" fill="#5c32a8" barSize={3} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WebVisitor;
