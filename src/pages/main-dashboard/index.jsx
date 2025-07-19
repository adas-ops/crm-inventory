import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricCard from './components/MetricCard';
import SalesChart from './components/SalesChart';
import InventoryChart from './components/InventoryChart';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import TopCustomers from './components/TopCustomers';
import LowStockAlerts from './components/LowStockAlerts';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  const [userRole] = useState('admin'); // Mock user role

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const dateRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
    // In a real app, this would trigger data refresh
    console.log('Date range changed to:', range);
  };

  const handleExportData = () => {
    // Mock export functionality
    console.log('Exporting dashboard data...');
    // In a real app, this would trigger data export
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, Admin User
              </h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} />
                  <span className="text-sm">{formatDate(currentTime)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span className="text-sm">{formatTime(currentTime)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {/* Date Range Selector */}
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={16} className="text-muted-foreground" />
                <select
                  value={selectedDateRange}
                  onChange={(e) => handleDateRangeChange(e.target.value)}
                  className="px-3 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {dateRangeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <Button variant="outline" onClick={handleExportData}>
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </Button>
              
              <Button onClick={() => navigate('/add-edit-inventory-item')}>
                <Icon name="Plus" size={16} className="mr-2" />
                Add Item
              </Button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Customers"
              value="1,247"
              change="+12.5%"
              changeType="positive"
              icon="Users"
              color="primary"
            />
            <MetricCard
              title="Inventory Value"
              value="$284,590"
              change="+8.2%"
              changeType="positive"
              icon="Package"
              color="success"
            />
            <MetricCard
              title="Low Stock Items"
              value="23"
              change="-5 items"
              changeType="negative"
              icon="AlertTriangle"
              color="warning"
            />
            <MetricCard
              title="Monthly Sales"
              value="$72,450"
              change="+15.3%"
              changeType="positive"
              icon="TrendingUp"
              color="success"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SalesChart />
            <InventoryChart />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed />
            </div>
            
            {/* Middle Column - Quick Actions and Top Customers */}
            <div className="lg:col-span-1 space-y-6">
              <QuickActions />
              <TopCustomers />
            </div>
            
            {/* Right Column - Low Stock Alerts */}
            <div className="lg:col-span-1">
              <LowStockAlerts />
            </div>
          </div>

          {/* Additional Dashboard Widgets for Mobile */}
          <div className="lg:hidden mt-6 space-y-6">
            {/* Mobile-specific layout adjustments would go here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;