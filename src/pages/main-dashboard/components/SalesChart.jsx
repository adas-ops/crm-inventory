import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesChart = () => {
  const salesData = [
    { month: 'Jan', sales: 45000, target: 50000 },
    { month: 'Feb', sales: 52000, target: 55000 },
    { month: 'Mar', sales: 48000, target: 52000 },
    { month: 'Apr', sales: 61000, target: 58000 },
    { month: 'May', sales: 55000, target: 60000 },
    { month: 'Jun', sales: 67000, target: 65000 },
    { month: 'Jul', sales: 72000, target: 70000 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-dropdown">
          <p className="text-sm font-medium text-foreground mb-2">{`${label} 2024`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: $${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sales Performance</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Actual Sales</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Target</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-80" aria-label="Sales Performance Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="Actual Sales"
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="var(--color-secondary)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 3 }}
              name="Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;