import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Company Logo */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Icon name="Package" size={28} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">CRM Inventory</h1>
            <p className="text-sm text-muted-foreground">Business Management System</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground">
          Sign in to your account to access your dashboard
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;