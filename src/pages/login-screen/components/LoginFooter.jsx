import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleCreateAccount = () => {
    navigate('/user-registration-screen');
  };

  const handleSupport = () => {
    // In real app, this would open support chat or navigate to support page
    alert('Support functionality would be implemented here');
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Create Account Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            onClick={handleCreateAccount}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-150"
          >
            Create Account
          </button>
        </p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Support</span>
        </div>
      </div>

      {/* Support Links */}
      <div className="flex justify-center space-x-6">
        <button
          onClick={handleSupport}
          className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          <Icon name="HelpCircle" size={16} />
          <span>Help Center</span>
        </button>
        <button
          onClick={handleSupport}
          className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          <Icon name="MessageCircle" size={16} />
          <span>Contact Support</span>
        </button>
      </div>

      {/* Copyright */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {currentYear} CRM Inventory System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;