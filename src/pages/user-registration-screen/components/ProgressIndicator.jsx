import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: 'Personal Info', icon: 'User' },
    { number: 2, title: 'Company Details', icon: 'Building' },
    { number: 3, title: 'Preferences', icon: 'Settings' },
    { number: 4, title: 'Review', icon: 'CheckCircle' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                  step.number < currentStep
                    ? 'bg-success border-success text-success-foreground'
                    : step.number === currentStep
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-background border-border text-muted-foreground'
                }`}
              >
                {step.number < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <div className="mt-2 text-center">
                <div
                  className={`text-xs font-medium ${
                    step.number <= currentStep
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </div>
                <div
                  className={`text-xs ${
                    step.number <= currentStep
                      ? 'text-muted-foreground'
                      : 'text-muted-foreground/60'
                  }`}
                >
                  Step {step.number}
                </div>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className={`h-0.5 transition-all duration-200 ${
                    step.number < currentStep
                      ? 'bg-success' :'bg-border'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="w-full bg-border rounded-full h-1 mt-2">
          <div
            className="bg-primary h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;