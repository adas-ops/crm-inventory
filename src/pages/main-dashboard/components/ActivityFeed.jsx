import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'customer',
      icon: 'UserPlus',
      title: 'New customer registered',
      description: 'Sarah Johnson created an account',
      timestamp: '2 minutes ago',
      color: 'success'
    },
    {
      id: 2,
      type: 'inventory',
      icon: 'Package',
      title: 'Inventory updated',
      description: 'Wireless Headphones stock increased by 50 units',
      timestamp: '15 minutes ago',
      color: 'primary'
    },
    {
      id: 3,
      type: 'sale',
      icon: 'ShoppingCart',
      title: 'New order placed',
      description: 'Order #ORD-2024-001 for $299.99',
      timestamp: '32 minutes ago',
      color: 'success'
    },
    {
      id: 4,
      type: 'alert',
      icon: 'AlertTriangle',
      title: 'Low stock alert',
      description: 'Bluetooth Speaker has only 5 units remaining',
      timestamp: '1 hour ago',
      color: 'warning'
    },
    {
      id: 5,
      type: 'customer',
      icon: 'MessageSquare',
      title: 'Customer inquiry',
      description: 'Michael Rodriguez sent a message about order status',
      timestamp: '2 hours ago',
      color: 'primary'
    },
    {
      id: 6,
      type: 'inventory',
      icon: 'Minus',
      title: 'Product removed',
      description: 'Discontinued item: Vintage Camera Model X',
      timestamp: '3 hours ago',
      color: 'error'
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const getBgColor = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10';
      case 'warning':
        return 'bg-warning/10';
      case 'error':
        return 'bg-error/10';
      default:
        return 'bg-primary/10';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getBgColor(activity.color)}`}>
              <Icon 
                name={activity.icon} 
                size={18} 
                className={getIconColor(activity.color)}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-2">{activity.timestamp}</p>
            </div>
            
            <div className="flex-shrink-0">
              <Button variant="ghost" size="sm">
                <Icon name="MoreHorizontal" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" fullWidth>
          Load More Activities
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;