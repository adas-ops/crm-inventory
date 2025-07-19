import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LowStockAlerts = () => {
  const navigate = useNavigate();

  const lowStockItems = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      sku: 'WBH-001',
      currentStock: 5,
      minStock: 20,
      category: 'Electronics',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
      urgency: 'critical'
    },
    {
      id: 2,
      name: 'Portable Bluetooth Speaker',
      sku: 'PBS-002',
      currentStock: 8,
      minStock: 15,
      category: 'Electronics',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop',
      urgency: 'high'
    },
    {
      id: 3,
      name: 'USB-C Charging Cable',
      sku: 'UCC-003',
      currentStock: 12,
      minStock: 50,
      category: 'Accessories',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop',
      urgency: 'medium'
    },
    {
      id: 4,
      name: 'Wireless Mouse',
      sku: 'WM-004',
      currentStock: 3,
      minStock: 25,
      category: 'Electronics',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&h=150&fit=crop',
      urgency: 'critical'
    },
    {
      id: 5,
      name: 'Phone Case - iPhone 15',
      sku: 'PC-005',
      currentStock: 7,
      minStock: 30,
      category: 'Accessories',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=150&h=150&fit=crop',
      urgency: 'high'
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'text-error';
      case 'high':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getUrgencyBg = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'bg-error/10';
      case 'high':
        return 'bg-warning/10';
      default:
        return 'bg-muted/50';
    }
  };

  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'Critical';
      case 'high':
        return 'High';
      default:
        return 'Medium';
    }
  };

  const handleRestockItem = (item) => {
    navigate('/add-edit-inventory-item', { state: { editItem: item } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Low Stock Alerts</h3>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/inventory-management')}
        >
          View All
        </Button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {lowStockItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-3 rounded-lg border border-border hover:border-warning/20 transition-all duration-200">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
              <Image 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {item.name}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyBg(item.urgency)} ${getUrgencyColor(item.urgency)}`}>
                  {getUrgencyLabel(item.urgency)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-xs text-muted-foreground">
                  Current: <span className={getUrgencyColor(item.urgency)}>{item.currentStock}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  Min: {item.minStock}
                </span>
                <span className="text-xs text-foreground font-medium">
                  ${item.price}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleRestockItem(item)}
              >
                <Icon name="Plus" size={14} className="mr-1" />
                Restock
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {lowStockItems.length} items need attention
          </span>
          <Button 
            variant="outline"
            onClick={() => navigate('/inventory-management')}
          >
            <Icon name="Package" size={16} className="mr-2" />
            Manage Inventory
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LowStockAlerts;