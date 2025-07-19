import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InventoryTable = ({ 
  items, 
  selectedItems, 
  onItemSelect, 
  onSelectAll, 
  onStockUpdate,
  sortConfig,
  onSort
}) => {
  const navigate = useNavigate();
  const [editingStock, setEditingStock] = useState(null);
  const [editValue, setEditValue] = useState('');

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

  const handleStockEdit = (itemId, currentStock) => {
    setEditingStock(itemId);
    setEditValue(currentStock.toString());
  };

  const handleStockSave = (itemId) => {
    const newStock = parseInt(editValue);
    if (!isNaN(newStock) && newStock >= 0) {
      onStockUpdate(itemId, newStock);
    }
    setEditingStock(null);
    setEditValue('');
  };

  const handleStockCancel = () => {
    setEditingStock(null);
    setEditValue('');
  };

  const handleEdit = (itemId) => {
    navigate('/add-edit-inventory-item', { state: { itemId, mode: 'edit' } });
  };

  const handleDuplicate = (item) => {
    navigate('/add-edit-inventory-item', { state: { item, mode: 'duplicate' } });
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedItems.length === items.length && items.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Product Name</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('sku')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>SKU</span>
                  <Icon name={getSortIcon('sku')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('category')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Category</span>
                  <Icon name={getSortIcon('category')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('stock')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Stock</span>
                  <Icon name={getSortIcon('stock')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Status</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('supplier')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Supplier</span>
                  <Icon name={getSortIcon('supplier')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('lastUpdated')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Last Updated</span>
                  <Icon name={getSortIcon('lastUpdated')} size={14} />
                </button>
              </th>
              <th className="text-right p-4">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => onItemSelect(item.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="Package" size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-foreground">{item.sku}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{item.category}</span>
                </td>
                <td className="p-4">
                  {editingStock === item.id ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-20"
                        min="0"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStockSave(item.id)}
                      >
                        <Icon name="Check" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleStockCancel}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStockEdit(item.id, item.stock)}
                      className="flex items-center space-x-2 hover:bg-muted rounded px-2 py-1 transition-colors"
                    >
                      <span className="font-medium text-foreground">{item.stock}</span>
                      <Icon name="Edit2" size={14} className="text-muted-foreground" />
                    </button>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    Reorder: {item.reorderLevel}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    getStockStatusColor(item.stock, item.reorderLevel)
                  }`}>
                    {getStockStatusText(item.stock, item.reorderLevel)}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{item.supplier}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(item.lastUpdated)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item.id)}
                      title="Edit item"
                    >
                      <Icon name="Edit2" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDuplicate(item)}
                      title="Duplicate item"
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete item"
                      className="text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;