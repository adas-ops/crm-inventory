import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import ProgressIndicator from './components/ProgressIndicator';
import RegistrationForm from './components/RegistrationForm';
import SecurityFeatures from './components/SecurityFeatures';

const UserRegistrationScreen = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <RegistrationHeader />
          
          <div className="bg-card rounded-lg shadow-card border border-border p-8">
            <ProgressIndicator currentStep={currentStep} totalSteps={4} />
            
            <div className="max-w-2xl mx-auto">
              <RegistrationForm 
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </div>
          </div>
          
          <SecurityFeatures />
          
          <div className="text-center mt-8 text-xs text-muted-foreground">
            <p>
              By creating an account, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} CRM Inventory. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationScreen;