import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StockAlerts = ({ alerts, onDismissAlert, onReorderItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (alerts.length === 0) return null;

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical');
  const warningAlerts = alerts.filter(alert => alert.type === 'warning');

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      default: return 'Info';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-error/10 border-error/20 text-error';
      case 'warning': return 'bg-warning/10 border-warning/20 text-warning';
      default: return 'bg-accent/10 border-accent/20 text-accent';
    }
  };

  return (
    <div className="mb-6">
      <div className={`border rounded-lg p-4 ${
        criticalAlerts.length > 0 
          ? 'bg-error/5 border-error/20' :'bg-warning/5 border-warning/20'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon 
              name={criticalAlerts.length > 0 ? "AlertCircle" : "AlertTriangle"} 
              size={20} 
              className={criticalAlerts.length > 0 ? "text-error" : "text-warning"}
            />
            <div>
              <h3 className="font-medium text-foreground">
                Stock Alerts ({alerts.length})
              </h3>
              <p className="text-sm text-muted-foreground">
                {criticalAlerts.length} critical, {warningAlerts.length} warnings
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Hide' : 'Show'} Details
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-3 rounded-md border ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={getAlertIcon(alert.type)} size={16} />
                  <div>
                    <div className="font-medium">{alert.productName}</div>
                    <div className="text-sm opacity-80">
                      SKU: {alert.sku} • Current Stock: {alert.currentStock} • Reorder Level: {alert.reorderLevel}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReorderItem(alert.productId)}
                    iconName="ShoppingCart"
                    iconPosition="left"
                  >
                    Reorder
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDismissAlert(alert.id)}
                    title="Dismiss alert"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAlerts;