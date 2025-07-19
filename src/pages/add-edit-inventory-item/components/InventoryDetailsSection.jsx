import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InventoryDetailsSection = ({ 
  formData, 
  handleInputChange, 
  errors, 
  generateBarcode 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BarChart3" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Inventory Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Input
          label="SKU"
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleInputChange}
          placeholder="Enter SKU"
          required
          error={errors.sku}
          description="Stock Keeping Unit - must be unique"
        />

        <div className="space-y-2">
          <Input
            label="Barcode"
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleInputChange}
            placeholder="Enter or generate barcode"
            error={errors.barcode}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={generateBarcode}
            iconName="Shuffle"
            iconPosition="left"
            className="w-full"
          >
            Generate Barcode
          </Button>
        </div>

        <Input
          label="Current Stock"
          type="number"
          name="currentStock"
          value={formData.currentStock}
          onChange={handleInputChange}
          placeholder="0"
          min="0"
          required
          error={errors.currentStock}
        />

        <Input
          label="Reorder Level"
          type="number"
          name="reorderLevel"
          value={formData.reorderLevel}
          onChange={handleInputChange}
          placeholder="0"
          min="0"
          required
          error={errors.reorderLevel}
          description="Alert when stock reaches this level"
        />

        <Input
          label="Reorder Quantity"
          type="number"
          name="reorderQuantity"
          value={formData.reorderQuantity}
          onChange={handleInputChange}
          placeholder="0"
          min="1"
          required
          error={errors.reorderQuantity}
          description="Quantity to reorder"
        />

        <Input
          label="Unit of Measure"
          type="text"
          name="unitOfMeasure"
          value={formData.unitOfMeasure}
          onChange={handleInputChange}
          placeholder="e.g., pieces, kg, liters"
          required
          error={errors.unitOfMeasure}
        />
      </div>
    </div>
  );
};

export default InventoryDetailsSection;