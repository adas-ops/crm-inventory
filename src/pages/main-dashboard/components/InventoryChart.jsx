import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InventoryChart = () => {
  const inventoryData = [
    { category: 'Electronics', inStock: 245, lowStock: 12, outOfStock: 3 },
    { category: 'Clothing', inStock: 189, lowStock: 8, outOfStock: 1 },
    { category: 'Home & Garden', inStock: 156, lowStock: 15, outOfStock: 5 },
    { category: 'Sports', inStock: 98, lowStock: 6, outOfStock: 2 },
    { category: 'Books', inStock: 234, lowStock: 4, outOfStock: 0 },
    { category: 'Automotive', inStock: 67, lowStock: 9, outOfStock: 4 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-dropdown">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} items`}
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
        <h3 className="text-lg font-semibold text-foreground">Inventory Status by Category</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">In Stock</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-sm text-muted-foreground">Low Stock</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-sm text-muted-foreground">Out of Stock</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-80" aria-label="Inventory Status Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={inventoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="category" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="inStock" 
              stackId="a" 
              fill="var(--color-success)" 
              name="In Stock"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="lowStock" 
              stackId="a" 
              fill="var(--color-warning)" 
              name="Low Stock"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="outOfStock" 
              stackId="a" 
              fill="var(--color-error)" 
              name="Out of Stock"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryChart;