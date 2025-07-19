import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CredentialsInfo = () => {
  const [isVisible, setIsVisible] = useState(false);

  const mockCredentials = [
    {
      role: 'Administrator',
      email: 'admin@crminventory.com',
      password: 'admin123',
      description: 'Full system access with all permissions'
    },
    {
      role: 'Manager',
      email: 'manager@crminventory.com',
      password: 'manager123',
      description: 'Customer and inventory management access'
    },
    {
      role: 'User',
      email: 'user@crminventory.com',
      password: 'user123',
      description: 'Basic dashboard and viewing permissions'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In real app, you'd show a toast notification
    alert('Copied to clipboard!');
  };

  return (
    <div className="mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(!isVisible)}
        iconName={isVisible ? "ChevronUp" : "ChevronDown"}
        iconPosition="right"
        fullWidth
      >
        Demo Credentials
      </Button>

      {isVisible && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border animate-slide-down">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Info" size={16} className="text-primary" />
              <p className="text-sm font-medium text-foreground">Test Accounts</p>
            </div>
            
            {mockCredentials.map((cred, index) => (
              <div key={index} className="bg-background rounded-md p-3 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{cred.role}</span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => copyToClipboard(cred.email)}
                      className="p-1 hover:bg-muted rounded transition-colors duration-150"
                      title="Copy email"
                    >
                      <Icon name="Copy" size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Email:</span>
                    <code className="bg-muted px-2 py-1 rounded text-foreground">{cred.email}</code>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Password:</span>
                    <code className="bg-muted px-2 py-1 rounded text-foreground">{cred.password}</code>
                  </div>
                  <p className="text-muted-foreground mt-1">{cred.description}</p>
                </div>
              </div>
            ))}
            
            <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-md">
              <p className="text-xs text-warning flex items-center space-x-1">
                <Icon name="AlertTriangle" size={12} />
                <span>These are demo credentials for testing purposes only</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialsInfo;