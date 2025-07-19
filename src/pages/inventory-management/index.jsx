import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterSidebar from './components/FilterSidebar';
import InventoryActions from './components/InventoryActions';
import StockAlerts from './components/StockAlerts';
import InventoryTable from './components/InventoryTable';
import MobileInventoryCard from './components/MobileInventoryCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InventoryManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStockStatus, setSelectedStockStatus] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [isMobile, setIsMobile] = useState(false);

  // Mock inventory data
  const mockInventoryData = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      description: "Premium noise-cancelling headphones with 30-hour battery",
      sku: "WBH-001",
      category: "Electronics",
      stock: 45,
      reorderLevel: 10,
      supplier: "Tech Supply Co.",
      lastUpdated: new Date(2025, 6, 15),
      price: 199.99
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      description: "Comfortable 100% organic cotton t-shirt in various colors",
      sku: "OCT-002",
      category: "Clothing",
      stock: 8,
      reorderLevel: 15,
      supplier: "Global Imports Ltd.",
      lastUpdated: new Date(2025, 6, 14),
      price: 29.99
    },
    {
      id: 3,
      name: "Smart Garden Sprinkler System",
      description: "WiFi-enabled automatic sprinkler with weather monitoring",
      sku: "SGS-003",
      category: "Home & Garden",
      stock: 0,
      reorderLevel: 5,
      supplier: "Local Wholesale",
      lastUpdated: new Date(2025, 6, 13),
      price: 149.99
    },
    {
      id: 4,
      name: "Professional Running Shoes",
      description: "Lightweight running shoes with advanced cushioning technology",
      sku: "PRS-004",
      category: "Sports & Outdoors",
      stock: 23,
      reorderLevel: 12,
      supplier: "Premium Goods Inc.",
      lastUpdated: new Date(2025, 6, 16),
      price: 129.99
    },
    {
      id: 5,
      name: "JavaScript Programming Guide",
      description: "Comprehensive guide to modern JavaScript development",
      sku: "JPG-005",
      category: "Books",
      stock: 12,
      reorderLevel: 8,
      supplier: "Quick Supply Chain",
      lastUpdated: new Date(2025, 6, 12),
      price: 39.99
    },
    {
      id: 6,
      name: "Car Phone Mount",
      description: "Universal magnetic phone mount for car dashboard",
      sku: "CPM-006",
      category: "Automotive",
      stock: 67,
      reorderLevel: 20,
      supplier: "Tech Supply Co.",
      lastUpdated: new Date(2025, 6, 17),
      price: 24.99
    },
    {
      id: 7,
      name: "Wireless Charging Pad",
      description: "Fast wireless charging pad compatible with all Qi devices",
      sku: "WCP-007",
      category: "Electronics",
      stock: 5,
      reorderLevel: 15,
      supplier: "Global Imports Ltd.",
      lastUpdated: new Date(2025, 6, 11),
      price: 49.99
    },
    {
      id: 8,
      name: "Yoga Mat Premium",
      description: "Non-slip premium yoga mat with carrying strap",
      sku: "YMP-008",
      category: "Sports & Outdoors",
      stock: 34,
      reorderLevel: 10,
      supplier: "Premium Goods Inc.",
      lastUpdated: new Date(2025, 6, 10),
      price: 59.99
    }
  ];

  // Mock stock alerts
  const mockStockAlerts = [
    {
      id: 1,
      type: 'critical',
      productId: 3,
      productName: 'Smart Garden Sprinkler System',
      sku: 'SGS-003',
      currentStock: 0,
      reorderLevel: 5
    },
    {
      id: 2,
      type: 'warning',
      productId: 2,
      productName: 'Organic Cotton T-Shirt',
      sku: 'OCT-002',
      currentStock: 8,
      reorderLevel: 15
    },
    {
      id: 3,
      type: 'warning',
      productId: 7,
      productName: 'Wireless Charging Pad',
      sku: 'WCP-007',
      currentStock: 5,
      reorderLevel: 15
    }
  ];

  const [inventoryData, setInventoryData] = useState(mockInventoryData);
  const [stockAlerts, setStockAlerts] = useState(mockStockAlerts);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and sort inventory data
  const filteredAndSortedData = React.useMemo(() => {
    let filtered = inventoryData;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item =>
        selectedCategories.some(category => 
          item.category.toLowerCase().includes(category.replace('-', ' '))
        )
      );
    }

    // Apply stock status filter
    if (selectedStockStatus.length > 0) {
      filtered = filtered.filter(item => {
        const hasInStock = selectedStockStatus.includes('in-stock') && item.stock > item.reorderLevel;
        const hasLowStock = selectedStockStatus.includes('low-stock') && item.stock <= item.reorderLevel && item.stock > 0;
        const hasOutOfStock = selectedStockStatus.includes('out-of-stock') && item.stock === 0;
        return hasInStock || hasLowStock || hasOutOfStock;
      });
    }

    // Apply supplier filter
    if (selectedSuppliers.length > 0) {
      filtered = filtered.filter(item =>
        selectedSuppliers.some(supplier =>
          item.supplier.toLowerCase().includes(supplier.replace('-', ' '))
        )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'lastUpdated') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [inventoryData, searchQuery, selectedCategories, selectedStockStatus, selectedSuppliers, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === filteredAndSortedData.length
        ? []
        : filteredAndSortedData.map(item => item.id)
    );
  };

  const handleStockUpdate = (itemId, newStock) => {
    setInventoryData(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, stock: newStock, lastUpdated: new Date() }
          : item
      )
    );

    // Update alerts based on new stock level
    const updatedItem = inventoryData.find(item => item.id === itemId);
    if (updatedItem) {
      setStockAlerts(prev => {
        const filtered = prev.filter(alert => alert.productId !== itemId);
        
        if (newStock === 0) {
          filtered.push({
            id: Date.now(),
            type: 'critical',
            productId: itemId,
            productName: updatedItem.name,
            sku: updatedItem.sku,
            currentStock: newStock,
            reorderLevel: updatedItem.reorderLevel
          });
        } else if (newStock <= updatedItem.reorderLevel) {
          filtered.push({
            id: Date.now(),
            type: 'warning',
            productId: itemId,
            productName: updatedItem.name,
            sku: updatedItem.sku,
            currentStock: newStock,
            reorderLevel: updatedItem.reorderLevel
          });
        }
        
        return filtered;
      });
    }
  };

  const handleBulkAction = (actionId, itemIds) => {
    console.log(`Performing bulk action: ${actionId} on items:`, itemIds);
    // Mock bulk action implementation
    switch (actionId) {
      case 'delete':
        setInventoryData(prev => prev.filter(item => !itemIds.includes(item.id)));
        setSelectedItems([]);
        break;
      default:
        // Handle other bulk actions
        break;
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedStockStatus([]);
    setSelectedSuppliers([]);
  };

  const handleDismissAlert = (alertId) => {
    setStockAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleReorderItem = (productId) => {
    console.log(`Reordering product with ID: ${productId}`);
    // Mock reorder functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            selectedStockStatus={selectedStockStatus}
            onStockStatusChange={setSelectedStockStatus}
            selectedSuppliers={selectedSuppliers}
            onSupplierChange={setSelectedSuppliers}
            onClearFilters={handleClearFilters}
            resultCount={filteredAndSortedData.length}
          />

          {/* Main Content */}
          <div className="flex-1 p-6">
            <Breadcrumb />
            
            <InventoryActions
              selectedItems={selectedItems}
              onBulkAction={handleBulkAction}
              totalItems={inventoryData.length}
            />

            <StockAlerts
              alerts={stockAlerts}
              onDismissAlert={handleDismissAlert}
              onReorderItem={handleReorderItem}
            />

            {/* Inventory Display */}
            {isMobile ? (
              <div className="space-y-4">
                {filteredAndSortedData.map((item) => (
                  <MobileInventoryCard
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.includes(item.id)}
                    onSelect={handleItemSelect}
                    onStockUpdate={handleStockUpdate}
                  />
                ))}
              </div>
            ) : (
              <InventoryTable
                items={filteredAndSortedData}
                selectedItems={selectedItems}
                onItemSelect={handleItemSelect}
                onSelectAll={handleSelectAll}
                onStockUpdate={handleStockUpdate}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            )}

            {/* Empty State */}
            {filteredAndSortedData.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedCategories.length > 0 || selectedStockStatus.length > 0 || selectedSuppliers.length > 0
                    ? 'Try adjusting your filters or search terms' :'Get started by adding your first inventory item'
                  }
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;