import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductInformationSection from './components/ProductInformationSection';
import InventoryDetailsSection from './components/InventoryDetailsSection';
import SupplierInformationSection from './components/SupplierInformationSection';
import PricingSection from './components/PricingSection';
import ImageUploadSection from './components/ImageUploadSection';
import FormActions from './components/FormActions';
import AutoSaveIndicator from './components/AutoSaveIndicator';
import Icon from '../../components/AppIcon';

const AddEditInventoryItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.state?.isEditing || false;
  const editingItem = location.state?.item || null;

  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    brand: '',
    sku: '',
    barcode: '',
    currentStock: '',
    reorderLevel: '',
    reorderQuantity: '',
    unitOfMeasure: '',
    primarySupplier: '',
    supplierCost: '',
    leadTime: '',
    supplierNotes: '',
    wholesaleCost: '',
    retailPrice: '',
    minimumPrice: '',
    msrp: ''
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [autoSaveEnabled] = useState(true);

  // Mock data
  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Apparel' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'books', label: 'Books & Media' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'health-beauty', label: 'Health & Beauty' },
    { value: 'toys-games', label: 'Toys & Games' }
  ];

  const brands = [
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'sony', label: 'Sony' },
    { value: 'nike', label: 'Nike' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'generic', label: 'Generic/No Brand' },
    { value: 'other', label: 'Other' }
  ];

  const suppliers = [
    { value: 'supplier1', label: 'TechWorld Distributors' },
    { value: 'supplier2', label: 'Global Electronics Supply' },
    { value: 'supplier3', label: 'Premium Parts Co.' },
    { value: 'supplier4', label: 'Wholesale Direct Inc.' },
    { value: 'supplier5', label: 'International Trading LLC' }
  ];

  // Initialize form data for editing
  useEffect(() => {
    if (isEditing && editingItem) {
      setFormData({
        productName: editingItem.name || '',
        description: editingItem.description || '',
        category: editingItem.category || '',
        brand: editingItem.brand || '',
        sku: editingItem.sku || '',
        barcode: editingItem.barcode || '',
        currentStock: editingItem.stock?.toString() || '',
        reorderLevel: editingItem.reorderLevel?.toString() || '',
        reorderQuantity: editingItem.reorderQuantity?.toString() || '',
        unitOfMeasure: editingItem.unitOfMeasure || '',
        primarySupplier: editingItem.supplier || '',
        supplierCost: editingItem.supplierCost?.toString() || '',
        leadTime: editingItem.leadTime?.toString() || '',
        supplierNotes: editingItem.supplierNotes || '',
        wholesaleCost: editingItem.wholesaleCost?.toString() || '',
        retailPrice: editingItem.price?.toString() || '',
        minimumPrice: editingItem.minimumPrice?.toString() || '',
        msrp: editingItem.msrp?.toString() || ''
      });

      if (editingItem.image) {
        setImages([{
          id: 1,
          url: editingItem.image,
          name: 'product-image.jpg',
          isPrimary: true
        }]);
      }
    }
  }, [isEditing, editingItem]);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSaveEnabled || !hasUnsavedChanges) return;

    const autoSaveTimer = setTimeout(() => {
      handleAutoSave();
    }, 3000);

    return () => clearTimeout(autoSaveTimer);
  }, [formData, hasUnsavedChanges, autoSaveEnabled]);

  const handleAutoSave = useCallback(async () => {
    if (!hasUnsavedChanges) return;

    setIsAutoSaving(true);
    
    // Simulate auto-save API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsAutoSaving(false);
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  }, [hasUnsavedChanges]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setHasUnsavedChanges(true);
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const generateBarcode = () => {
    const barcode = 'BC' + Date.now().toString().slice(-8);
    setFormData(prev => ({
      ...prev,
      barcode
    }));
    setHasUnsavedChanges(true);
  };

  const calculateMarkup = () => {
    const wholesale = parseFloat(formData.wholesaleCost) || 0;
    const retail = parseFloat(formData.retailPrice) || 0;
    
    if (wholesale === 0) return '0.00';
    
    const markup = ((retail - wholesale) / wholesale) * 100;
    return markup.toFixed(2);
  };

  const handleImageUpload = (newImage) => {
    setImages(prev => [...prev, newImage]);
    setHasUnsavedChanges(true);
  };

  const removeImage = (imageId) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== imageId);
      // If we removed the primary image, make the first remaining image primary
      if (filtered.length > 0 && !filtered.some(img => img.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
    setHasUnsavedChanges(true);
  };

  const setPrimaryImage = (imageId) => {
    setImages(prev => prev.map(img => ({
      ...img,
      isPrimary: img.id === imageId
    })));
    setHasUnsavedChanges(true);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }

    if (!formData.currentStock || parseFloat(formData.currentStock) < 0) {
      newErrors.currentStock = 'Valid current stock is required';
    }

    if (!formData.reorderLevel || parseFloat(formData.reorderLevel) < 0) {
      newErrors.reorderLevel = 'Valid reorder level is required';
    }

    if (!formData.reorderQuantity || parseFloat(formData.reorderQuantity) <= 0) {
      newErrors.reorderQuantity = 'Valid reorder quantity is required';
    }

    if (!formData.unitOfMeasure.trim()) {
      newErrors.unitOfMeasure = 'Unit of measure is required';
    }

    if (!formData.primarySupplier) {
      newErrors.primarySupplier = 'Primary supplier is required';
    }

    if (!formData.supplierCost || parseFloat(formData.supplierCost) < 0) {
      newErrors.supplierCost = 'Valid supplier cost is required';
    }

    if (!formData.leadTime || parseFloat(formData.leadTime) < 0) {
      newErrors.leadTime = 'Valid lead time is required';
    }

    if (!formData.wholesaleCost || parseFloat(formData.wholesaleCost) < 0) {
      newErrors.wholesaleCost = 'Valid wholesale cost is required';
    }

    if (!formData.retailPrice || parseFloat(formData.retailPrice) < 0) {
      newErrors.retailPrice = 'Valid retail price is required';
    }

    if (parseFloat(formData.retailPrice) <= parseFloat(formData.wholesaleCost)) {
      newErrors.retailPrice = 'Retail price must be higher than wholesale cost';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      
      // Navigate back to inventory management
      navigate('/inventory-management', {
        state: {
          message: isEditing ? 'Item updated successfully!' : 'Item added successfully!',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAndAddAnother = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        productName: '',
        description: '',
        category: '',
        brand: '',
        sku: '',
        barcode: '',
        currentStock: '',
        reorderLevel: '',
        reorderQuantity: '',
        unitOfMeasure: '',
        primarySupplier: '',
        supplierCost: '',
        leadTime: '',
        supplierNotes: '',
        wholesaleCost: '',
        retailPrice: '',
        minimumPrice: '',
        msrp: ''
      });
      setImages([]);
      setErrors({});
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      
      // Scroll to top
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (!confirmLeave) return;
    }
    
    navigate('/inventory-management');
  };

  // Prevent navigation with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Package" size={24} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                {isEditing ? `Edit ${editingItem?.name || 'Item'}` : 'Add New Inventory Item'}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {isEditing 
                ? 'Update product information, inventory details, and pricing'
                : 'Create a new inventory item with complete product information and stock details'
              }
            </p>
          </div>

          {/* Form Sections */}
          <div className="space-y-8">
            <ProductInformationSection
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              categories={categories}
              brands={brands}
            />

            <InventoryDetailsSection
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              generateBarcode={generateBarcode}
            />

            <SupplierInformationSection
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              suppliers={suppliers}
            />

            <PricingSection
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              calculateMarkup={calculateMarkup}
            />

            <ImageUploadSection
              images={images}
              handleImageUpload={handleImageUpload}
              removeImage={removeImage}
              setPrimaryImage={setPrimaryImage}
            />

            <FormActions
              isEditing={isEditing}
              isLoading={isLoading}
              onSave={handleSave}
              onSaveAndAddAnother={handleSaveAndAddAnother}
              onCancel={handleCancel}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          </div>
        </div>
      </main>

      <AutoSaveIndicator
        isAutoSaving={isAutoSaving}
        lastSaved={lastSaved}
        autoSaveEnabled={autoSaveEnabled}
      />
    </div>
  );
};

export default AddEditInventoryItem;