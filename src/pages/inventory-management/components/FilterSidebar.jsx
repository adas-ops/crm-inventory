import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ 
  searchQuery, 
  onSearchChange, 
  selectedCategories, 
  onCategoryChange,
  selectedStockStatus,
  onStockStatusChange,
  selectedSuppliers,
  onSupplierChange,
  onClearFilters,
  resultCount
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const categories = [
    { id: 'electronics', label: 'Electronics', count: 45 },
    { id: 'clothing', label: 'Clothing', count: 32 },
    { id: 'home-garden', label: 'Home & Garden', count: 28 },
    { id: 'sports', label: 'Sports & Outdoors', count: 19 },
    { id: 'books', label: 'Books', count: 15 },
    { id: 'automotive', label: 'Automotive', count: 12 }
  ];

  const stockStatuses = [
    { id: 'in-stock', label: 'In Stock', count: 89, color: 'text-success' },
    { id: 'low-stock', label: 'Low Stock', count: 23, color: 'text-warning' },
    { id: 'out-of-stock', label: 'Out of Stock', count: 8, color: 'text-error' }
  ];

  const suppliers = [
    { id: 'tech-supply', label: 'Tech Supply Co.', count: 34 },
    { id: 'global-imports', label: 'Global Imports Ltd.', count: 28 },
    { id: 'local-wholesale', label: 'Local Wholesale', count: 22 },
    { id: 'premium-goods', label: 'Premium Goods Inc.', count: 18 },
    { id: 'quick-supply', label: 'Quick Supply Chain', count: 15 }
  ];

  const handleCategoryToggle = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(updatedCategories);
  };

  const handleStockStatusToggle = (statusId) => {
    const updatedStatus = selectedStockStatus.includes(statusId)
      ? selectedStockStatus.filter(id => id !== statusId)
      : [...selectedStockStatus, statusId];
    onStockStatusChange(updatedStatus);
  };

  const handleSupplierToggle = (supplierId) => {
    const updatedSuppliers = selectedSuppliers.includes(supplierId)
      ? selectedSuppliers.filter(id => id !== supplierId)
      : [...selectedSuppliers, supplierId];
    onSupplierChange(updatedSuppliers);
  };

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    } lg:w-80`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
          </Button>
        </div>
        
        {!isCollapsed && (
          <div className="mt-4">
            <Input
              type="search"
              placeholder="Search products, SKU, barcode..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
            <div className="mt-2 text-xs text-muted-foreground">
              {resultCount} items found
            </div>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Categories Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <Checkbox
                    label={category.label}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    size="sm"
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Status Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Stock Status</h4>
            <div className="space-y-2">
              {stockStatuses.map((status) => (
                <div key={status.id} className="flex items-center justify-between">
                  <Checkbox
                    label={
                      <span className={status.color}>
                        {status.label}
                      </span>
                    }
                    checked={selectedStockStatus.includes(status.id)}
                    onChange={() => handleStockStatusToggle(status.id)}
                    size="sm"
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {status.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Suppliers Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Suppliers</h4>
            <div className="space-y-2">
              {suppliers.map((supplier) => (
                <div key={supplier.id} className="flex items-center justify-between">
                  <Checkbox
                    label={supplier.label}
                    checked={selectedSuppliers.includes(supplier.id)}
                    onChange={() => handleSupplierToggle(supplier.id)}
                    size="sm"
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {supplier.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full"
              iconName="X"
              iconPosition="left"
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;