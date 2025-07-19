import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TopCustomers = () => {
  const navigate = useNavigate();

  const topCustomers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e5b4e1?w=150&h=150&fit=crop&crop=face',
      totalOrders: 24,
      totalSpent: 4850.00,
      lastOrder: '2 days ago',
      status: 'active'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      email: 'michael.r@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      totalOrders: 18,
      totalSpent: 3200.00,
      lastOrder: '1 week ago',
      status: 'active'
    },
    {
      id: 3,
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      totalOrders: 15,
      totalSpent: 2890.00,
      lastOrder: '3 days ago',
      status: 'active'
    },
    {
      id: 4,
      name: 'David Thompson',
      email: 'david.t@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      totalOrders: 12,
      totalSpent: 2150.00,
      lastOrder: '5 days ago',
      status: 'inactive'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      totalOrders: 10,
      totalSpent: 1980.00,
      lastOrder: '1 week ago',
      status: 'active'
    }
  ];

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-muted-foreground';
  };

  const getStatusBg = (status) => {
    return status === 'active' ? 'bg-success/10' : 'bg-muted';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Top Customers</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/customer-management')}
        >
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {topCustomers.map((customer, index) => (
          <div key={customer.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150">
            <div className="flex items-center space-x-3 flex-1">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image 
                    src={customer.avatar} 
                    alt={customer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {customer.name}
                  </h4>
                  <div className={`w-2 h-2 rounded-full ${getStatusBg(customer.status)}`}>
                    <div className={`w-full h-full rounded-full ${getStatusColor(customer.status)} bg-current`}></div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Last order: {customer.lastOrder}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">
                ${customer.totalSpent.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                {customer.totalOrders} orders
              </p>
            </div>
            
            <Button variant="ghost" size="sm">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          fullWidth
          onClick={() => navigate('/customer-management')}
        >
          <Icon name="Users" size={16} className="mr-2" />
          Manage All Customers
        </Button>
      </div>
    </div>
  );
};

export default TopCustomers;