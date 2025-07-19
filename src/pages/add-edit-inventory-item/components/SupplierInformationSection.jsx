import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SupplierInformationSection = ({ 
  formData, 
  handleInputChange, 
  errors, 
  suppliers 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Truck" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Supplier Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Select
          label="Primary Supplier"
          options={suppliers}
          value={formData.primarySupplier}
          onChange={(value) => handleInputChange({ target: { name: 'primarySupplier', value } })}
          placeholder="Select supplier"
          searchable
          required
          error={errors.primarySupplier}
        />

        <Input
          label="Supplier Cost"
          type="number"
          name="supplierCost"
          value={formData.supplierCost}
          onChange={handleInputChange}
          placeholder="0.00"
          min="0"
          step="0.01"
          required
          error={errors.supplierCost}
          description="Cost per unit from supplier"
        />

        <Input
          label="Lead Time (Days)"
          type="number"
          name="leadTime"
          value={formData.leadTime}
          onChange={handleInputChange}
          placeholder="0"
          min="0"
          required
          error={errors.leadTime}
          description="Days from order to delivery"
        />

        <div className="md:col-span-2 lg:col-span-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Supplier Notes
            </label>
            <textarea
              name="supplierNotes"
              value={formData.supplierNotes}
              onChange={handleInputChange}
              placeholder="Additional supplier information, terms, etc."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierInformationSection;