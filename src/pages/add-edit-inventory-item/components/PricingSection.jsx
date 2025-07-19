import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PricingSection = ({ 
  formData, 
  handleInputChange, 
  errors, 
  calculateMarkup 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="DollarSign" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Pricing Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Input
          label="Wholesale Cost"
          type="number"
          name="wholesaleCost"
          value={formData.wholesaleCost}
          onChange={handleInputChange}
          placeholder="0.00"
          min="0"
          step="0.01"
          required
          error={errors.wholesaleCost}
          description="Base cost for wholesale"
        />

        <Input
          label="Retail Price"
          type="number"
          name="retailPrice"
          value={formData.retailPrice}
          onChange={handleInputChange}
          placeholder="0.00"
          min="0"
          step="0.01"
          required
          error={errors.retailPrice}
          description="Selling price to customers"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Markup Percentage
          </label>
          <div className="relative">
            <input
              type="text"
              value={calculateMarkup()}
              readOnly
              className="w-full px-3 py-2 border border-border rounded-md bg-muted text-foreground cursor-not-allowed"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-muted-foreground">%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Automatically calculated based on wholesale cost and retail price
          </p>
        </div>

        <Input
          label="Minimum Price"
          type="number"
          name="minimumPrice"
          value={formData.minimumPrice}
          onChange={handleInputChange}
          placeholder="0.00"
          min="0"
          step="0.01"
          error={errors.minimumPrice}
          description="Lowest acceptable selling price"
        />

        <Input
          label="MSRP"
          type="number"
          name="msrp"
          value={formData.msrp}
          onChange={handleInputChange}
          placeholder="0.00"
          min="0"
          step="0.01"
          error={errors.msrp}
          description="Manufacturer's Suggested Retail Price"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Profit Margin
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.retailPrice && formData.wholesaleCost ? 
                `$${(parseFloat(formData.retailPrice) - parseFloat(formData.wholesaleCost)).toFixed(2)}` : 
                '$0.00'
              }
              readOnly
              className="w-full px-3 py-2 border border-border rounded-md bg-muted text-foreground cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Profit per unit (Retail Price - Wholesale Cost)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;