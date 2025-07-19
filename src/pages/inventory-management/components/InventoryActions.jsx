import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryActions = ({ selectedItems, onBulkAction, totalItems }) => {
  const navigate = useNavigate();
  const [showBulkMenu, setShowBulkMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const bulkActions = [
    { id: 'update-stock', label: 'Update Stock Levels', icon: 'Package' },
    { id: 'change-category', label: 'Change Category', icon: 'Tag' },
    { id: 'update-supplier', label: 'Update Supplier', icon: 'Truck' },
    { id: 'set-reorder-level', label: 'Set Reorder Level', icon: 'AlertTriangle' },
    { id: 'delete', label: 'Delete Items', icon: 'Trash2', destructive: true }
  ];

  const exportOptions = [
    { id: 'csv', label: 'Export as CSV', icon: 'FileText' },
    { id: 'excel', label: 'Export as Excel', icon: 'FileSpreadsheet' },
    { id: 'pdf', label: 'Export as PDF', icon: 'FileDown' },
    { id: 'json', label: 'Export as JSON', icon: 'Code' }
  ];

  const handleAddNew = () => {
    navigate('/add-edit-inventory-item', { state: { mode: 'add' } });
  };

  const handleBulkAction = (actionId) => {
    onBulkAction(actionId, selectedItems);
    setShowBulkMenu(false);
  };

  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting ${totalItems} items as ${format}`);
    setShowExportMenu(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-foreground">Inventory Management</h2>
        <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {totalItems} items
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowBulkMenu(!showBulkMenu)}
              iconName="MoreHorizontal"
              iconPosition="right"
            >
              Bulk Actions ({selectedItems.length})
            </Button>
            
            {showBulkMenu && (
              <div className="absolute top-full right-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-dropdown z-50 animate-scale-in">
                <div className="py-2">
                  {bulkActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleBulkAction(action.id)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors duration-150 flex items-center space-x-2 ${
                        action.destructive ? 'text-destructive' : 'text-foreground'
                      }`}
                    >
                      <Icon name={action.icon} size={16} />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Export Menu */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowExportMenu(!showExportMenu)}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
          
          {showExportMenu && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-dropdown z-50 animate-scale-in">
              <div className="py-2">
                {exportOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleExport(option.id)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors duration-150 flex items-center space-x-2 text-foreground"
                  >
                    <Icon name={option.icon} size={16} />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add New Item */}
        <Button
          variant="default"
          onClick={handleAddNew}
          iconName="Plus"
          iconPosition="left"
        >
          Add New Item
        </Button>
      </div>
    </div>
  );
};

export default InventoryActions;