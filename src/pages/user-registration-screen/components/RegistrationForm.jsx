import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';


const RegistrationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Company Details
    businessName: '',
    industry: '',
    businessSize: '',
    website: '',
    
    // Account Preferences
    role: '',
    timezone: '',
    notifications: {
      email: true,
      sms: false,
      marketing: false
    },
    
    // Terms and Privacy
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const [errors, setErrors] = useState({});

  const industryOptions = [
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'education', label: 'Education' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'construction', label: 'Construction' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'other', label: 'Other' }
  ];

  const businessSizeOptions = [
    { value: 'solo', label: 'Solo (1 person)' },
    { value: 'small', label: 'Small (2-10 employees)' },
    { value: 'medium', label: 'Medium (11-50 employees)' },
    { value: 'large', label: 'Large (51-200 employees)' },
    { value: 'enterprise', label: 'Enterprise (200+ employees)' }
  ];

  const roleOptions = [
    { value: 'owner', label: 'Business Owner' },
    { value: 'manager', label: 'Manager' },
    { value: 'sales', label: 'Sales Representative' },
    { value: 'inventory', label: 'Inventory Manager' },
    { value: 'admin', label: 'Administrator' },
    { value: 'staff', label: 'Staff Member' }
  ];

  const timezoneOptions = [
    { value: 'EST', label: 'Eastern Time (EST)' },
    { value: 'CST', label: 'Central Time (CST)' },
    { value: 'MST', label: 'Mountain Time (MST)' },
    { value: 'PST', label: 'Pacific Time (PST)' },
    { value: 'UTC', label: 'UTC' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNotificationChange = (type, checked) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.industry) newErrors.industry = 'Please select an industry';
      if (!formData.businessSize) newErrors.businessSize = 'Please select business size';
    }

    if (step === 3) {
      if (!formData.role) newErrors.role = 'Please select your role';
      if (!formData.timezone) newErrors.timezone = 'Please select your timezone';
    }

    if (step === 4) {
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms of service';
      if (!formData.agreePrivacy) newErrors.agreePrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to login with success message
      navigate('/login-screen', { 
        state: { 
          message: 'Registration successful! Please check your email to verify your account.',
          type: 'success'
        }
      });
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  error={errors.firstName}
                  required
                />
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  error={errors.lastName}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  description="Must be at least 8 characters"
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Company Details</h3>
              <div className="space-y-4">
                <Input
                  label="Business Name"
                  type="text"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  error={errors.businessName}
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Industry"
                    placeholder="Select your industry"
                    options={industryOptions}
                    value={formData.industry}
                    onChange={(value) => handleInputChange('industry', value)}
                    error={errors.industry}
                    required
                    searchable
                  />
                  <Select
                    label="Business Size"
                    placeholder="Select business size"
                    options={businessSizeOptions}
                    value={formData.businessSize}
                    onChange={(value) => handleInputChange('businessSize', value)}
                    error={errors.businessSize}
                    required
                  />
                </div>
                
                <Input
                  label="Website (Optional)"
                  type="url"
                  placeholder="https://www.yourwebsite.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  description="Your business website URL"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Account Preferences</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Your Role"
                    placeholder="Select your role"
                    options={roleOptions}
                    value={formData.role}
                    onChange={(value) => handleInputChange('role', value)}
                    error={errors.role}
                    required
                  />
                  <Select
                    label="Timezone"
                    placeholder="Select your timezone"
                    options={timezoneOptions}
                    value={formData.timezone}
                    onChange={(value) => handleInputChange('timezone', value)}
                    error={errors.timezone}
                    required
                  />
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Notification Preferences</h4>
                  <div className="space-y-3">
                    <Checkbox
                      label="Email notifications"
                      description="Receive important updates via email"
                      checked={formData.notifications.email}
                      onChange={(e) => handleNotificationChange('email', e.target.checked)}
                    />
                    <Checkbox
                      label="SMS notifications"
                      description="Receive urgent alerts via SMS"
                      checked={formData.notifications.sms}
                      onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                    />
                    <Checkbox
                      label="Marketing communications"
                      description="Receive product updates and tips"
                      checked={formData.notifications.marketing}
                      onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Terms & Privacy</h3>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Account Summary</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Business:</span> {formData.businessName}</p>
                    <p><span className="font-medium">Role:</span> {roleOptions.find(r => r.value === formData.role)?.label}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Checkbox
                    label="I agree to the Terms of Service"
                    description="By checking this box, you agree to our terms and conditions"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    error={errors.agreeTerms}
                    required
                  />
                  <Checkbox
                    label="I agree to the Privacy Policy"
                    description="By checking this box, you agree to our privacy policy"
                    checked={formData.agreePrivacy}
                    onChange={(e) => handleInputChange('agreePrivacy', e.target.checked)}
                    error={errors.agreePrivacy}
                    required
                  />
                  <Checkbox
                    label="I agree to receive marketing communications"
                    description="Optional: Receive product updates and promotional content"
                    checked={formData.agreeMarketing}
                    onChange={(e) => handleInputChange('agreeMarketing', e.target.checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {renderStepContent()}
      
      <div className="flex justify-between pt-6 border-t border-border">
        <div>
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
          )}
        </div>
        
        <div>
          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="submit"
              loading={isLoading}
              iconName="UserPlus"
              iconPosition="left"
            >
              Create Account
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;