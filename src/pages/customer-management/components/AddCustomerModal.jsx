import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddCustomerModal = ({ isOpen, onClose, onSave, editingCustomer }) => {
  const [formData, setFormData] = useState({
    name: editingCustomer?.name || '',
    title: editingCustomer?.title || '',
    company: editingCustomer?.company || '',
    email: editingCustomer?.email || '',
    phone: editingCustomer?.phone || '',
    industry: editingCustomer?.industry || '',
    location: editingCustomer?.location || '',
    status: editingCustomer?.status || 'prospect'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'education', label: 'Education' }
  ];

  const statusOptions = [
    { value: 'prospect', label: 'Prospect' },
    { value: 'lead', label: 'Lead' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const locationOptions = [
    { value: 'new-york', label: 'New York' },
    { value: 'california', label: 'California' },
    { value: 'texas', label: 'Texas' },
    { value: 'florida', label: 'Florida' },
    { value: 'illinois', label: 'Illinois' }
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const customerData = {
        ...formData,
        id: editingCustomer?.id || Date.now().toString(),
        lastInteraction: editingCustomer?.lastInteraction || new Date().toISOString(),
        avatar: editingCustomer?.avatar || null
      };

      onSave(customerData);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        title: '',
        company: '',
        email: '',
        phone: '',
        industry: '',
        location: '',
        status: 'prospect'
      });
    } catch (error) {
      console.error('Error saving customer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      industry: '',
      location: '',
      status: 'prospect'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-lg shadow-modal animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            iconName="X"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />
              <Input
                label="Job Title"
                type="text"
                placeholder="Enter job title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                required
              />
            </div>
          </div>

          {/* Company Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                type="text"
                placeholder="Enter company name"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                error={errors.company}
                required
              />
              <Select
                label="Industry"
                options={industryOptions}
                value={formData.industry}
                onChange={(value) => handleInputChange('industry', value)}
                error={errors.industry}
                placeholder="Select industry"
                required
              />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Location"
                options={locationOptions}
                value={formData.location}
                onChange={(value) => handleInputChange('location', value)}
                error={errors.location}
                placeholder="Select location"
                required
              />
              <Select
                label="Status"
                options={statusOptions}
                value={formData.status}
                onChange={(value) => handleInputChange('status', value)}
                placeholder="Select status"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Save"
              iconPosition="left"
            >
              {editingCustomer ? 'Update Customer' : 'Add Customer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;