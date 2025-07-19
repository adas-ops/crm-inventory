import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ProductInformationSection = ({ 
  formData, 
  handleInputChange, 
  errors, 
  categories, 
  brands 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Package" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Product Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Product Name"
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Enter product name"
            required
            error={errors.productName}
          />
        </div>

        <div className="md:col-span-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>
        </div>

        <Select
          label="Category"
          options={categories}
          value={formData.category}
          onChange={(value) => handleInputChange({ target: { name: 'category', value } })}
          placeholder="Select category"
          required
          error={errors.category}
        />

        <Select
          label="Brand"
          options={brands}
          value={formData.brand}
          onChange={(value) => handleInputChange({ target: { name: 'brand', value } })}
          placeholder="Select brand"
          searchable
          error={errors.brand}
        />
      </div>
    </div>
  );
};

export default ProductInformationSection;