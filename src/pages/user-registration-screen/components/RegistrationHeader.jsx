import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="Package" size={24} color="white" />
        </div>
        <span className="ml-3 text-2xl font-bold text-foreground">CRM Inventory</span>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Join thousands of businesses streamlining their operations with our comprehensive CRM and inventory management platform.
      </p>
      
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <span>Already have an account?</span>
        <Button
          variant="link"
          onClick={() => navigate('/login-screen')}
          className="p-0 h-auto font-medium"
        >
          Sign in here
        </Button>
      </div>
    </div>
  );
};

export default RegistrationHeader;