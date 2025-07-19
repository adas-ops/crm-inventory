import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: 'Add Customer',
      description: 'Create new customer profile',
      icon: 'UserPlus',
      color: 'success',
      action: () => navigate('/customer-management')
    },
    {
      id: 2,
      title: 'Add Inventory',
      description: 'Add new product to inventory',
      icon: 'Package',
      color: 'primary',
      action: () => navigate('/add-edit-inventory-item')
    },
    {
      id: 3,
      title: 'View Reports',
      description: 'Generate business reports',
      icon: 'BarChart3',
      color: 'secondary',
      action: () => console.log('Reports feature coming soon')
    },
    {
      id: 4,
      title: 'Manage Orders',
      description: 'Process customer orders',
      icon: 'ShoppingCart',
      color: 'warning',
      action: () => console.log('Orders feature coming soon')
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success hover:bg-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning hover:bg-warning/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary hover:bg-secondary/20';
      default:
        return 'bg-primary/10 text-primary hover:bg-primary/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/20 transition-all duration-200 text-left group"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${getColorClasses(action.color)}`}>
              <Icon name={action.icon} size={20} />
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                {action.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {action.description}
              </p>
            </div>
            
            <Icon 
              name="ChevronRight" 
              size={16} 
              className="text-muted-foreground group-hover:text-primary transition-colors duration-200"
            />
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" fullWidth>
          <Icon name="Settings" size={16} className="mr-2" />
          Customize Dashboard
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;