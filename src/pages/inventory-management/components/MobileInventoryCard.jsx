import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MobileInventoryCard = ({ 
  item, 
  isSelected, 
  onSelect, 
  onStockUpdate 
}) => {
  const navigate = useNavigate();
  const [isEditingStock, setIsEditingStock] = useState(false);
  const [editValue, setEditValue] = useState(item.stock.toString());
  const [showActions, setShowActions] = useState(false);

  const getStockStatusColor = (stock, reorderLevel) => {
    if (stock === 0) return 'text-error bg-error/10';
    if (stock <= reorderLevel) return 'text-warning bg-warning/10';
    return 'text-success bg-success/10';
  };

  const getStockStatusText = (stock, reorderLevel) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= reorderLevel) return 'Low Stock';
    return 'In Stock';
  };

  const handleStockSave = () => {
    const newStock = parseInt(editValue);
    if (!isNaN(newStock) && newStock >= 0) {
      onStockUpdate(item.id, newStock);
    }
    setIsEditingStock(false);
  };

  const handleStockCancel = () => {
    setEditValue(item.stock.toString());
    setIsEditingStock(false);
  };

  const handleEdit = () => {
    navigate('/add-edit-inventory-item', { state: { itemId: item.id, mode: 'edit' } });
  };

  const handleDuplicate = () => {
    navigate('/add-edit-inventory-item', { state: { item, mode: 'duplicate' } });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(item.id)}
            className="rounded border-border mt-1"
          />
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="Package" size={24} className="text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{item.name}</h3>
            <p className="text-sm text-muted-foreground truncate">{item.description}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowActions(!showActions)}
        >
          <Icon name="MoreVertical" size={20} />
        </Button>
      </div>

      {/* SKU and Category */}
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="text-muted-foreground">SKU: </span>
          <span className="font-mono text-foreground">{item.sku}</span>
        </div>
        <div className="text-muted-foreground">{item.category}</div>
      </div>

      {/* Stock Information */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Stock:</span>
          {isEditingStock ? (
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-20 h-8"
                min="0"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleStockSave}
                className="h-8 w-8"
              >
                <Icon name="Check" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleStockCancel}
                className="h-8 w-8"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingStock(true)}
              className="flex items-center space-x-1 hover:bg-muted rounded px-2 py-1 transition-colors"
            >
              <span className="font-medium text-foreground">{item.stock}</span>
              <Icon name="Edit2" size={12} className="text-muted-foreground" />
            </button>
          )}
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          getStockStatusColor(item.stock, item.reorderLevel)
        }`}>
          {getStockStatusText(item.stock, item.reorderLevel)}
        </span>
      </div>

      {/* Supplier and Date */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          <span>Supplier: </span>
          <span className="text-foreground">{item.supplier}</span>
        </div>
        <div>Updated {formatDate(item.lastUpdated)}</div>
      </div>

      {/* Reorder Level */}
      <div className="text-xs text-muted-foreground">
        Reorder Level: {item.reorderLevel}
      </div>

      {/* Action Menu */}
      {showActions && (
        <div className="border-t border-border pt-3 mt-3">
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              iconName="Edit2"
              iconPosition="left"
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDuplicate}
              iconName="Copy"
              iconPosition="left"
            >
              Duplicate
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              className="text-destructive hover:text-destructive"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileInventoryCard;