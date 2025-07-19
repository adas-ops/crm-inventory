import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = () => {
  const features = [
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols'
    },
    {
      icon: 'Lock',
      title: 'Data Protection',
      description: 'Your data is encrypted and securely stored'
    },
    {
      icon: 'CheckCircle',
      title: 'GDPR Compliant',
      description: 'Full compliance with data protection regulations'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Secure multi-user access with role-based permissions'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-6 mt-8">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
        Why Choose CRM Inventory?
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={feature.icon} size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">{feature.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={12} />
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={12} />
            <span>SOC 2 Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;