import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import CustomerFilters from './components/CustomerFilters';
import CustomerTable from './components/CustomerTable';
import CustomerDetailPanel from './components/CustomerDetailPanel';
import BulkActionsBar from './components/BulkActionsBar';
import AddCustomerModal from './components/AddCustomerModal';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock customer data
  const mockCustomers = [
    {
      id: "CUST001",
      name: "John Smith",
      title: "CEO",
      company: "TechCorp Solutions",
      email: "john.smith@techcorp.com",
      phone: "+1 (555) 123-4567",
      industry: "technology",
      location: "new-york",
      status: "active",
      lastInteraction: "2025-01-15T10:30:00Z",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "CUST002",
      name: "Sarah Johnson",
      title: "CTO",
      company: "HealthTech Innovations",
      email: "sarah.johnson@healthtech.com",
      phone: "+1 (555) 234-5678",
      industry: "healthcare",
      location: "california",
      status: "prospect",
      lastInteraction: "2025-01-14T14:15:00Z",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "CUST003",
      name: "Michael Chen",
      title: "VP of Operations",
      company: "Financial Services Inc",
      email: "michael.chen@finservices.com",
      phone: "+1 (555) 345-6789",
      industry: "finance",
      location: "texas",
      status: "lead",
      lastInteraction: "2025-01-13T09:45:00Z",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "CUST004",
      name: "Emily Rodriguez",
      title: "Marketing Director",
      company: "Retail Solutions LLC",
      email: "emily.rodriguez@retailsolutions.com",
      phone: "+1 (555) 456-7890",
      industry: "retail",
      location: "florida",
      status: "active",
      lastInteraction: "2025-01-12T16:20:00Z",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "CUST005",
      name: "David Wilson",
      title: "Plant Manager",
      company: "Manufacturing Corp",
      email: "david.wilson@manufacturing.com",
      phone: "+1 (555) 567-8901",
      industry: "manufacturing",
      location: "illinois",
      status: "inactive",
      lastInteraction: "2025-01-10T11:30:00Z",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "CUST006",
      name: "Lisa Thompson",
      title: "Principal",
      company: "Education First Academy",
      email: "lisa.thompson@educationfirst.com",
      phone: "+1 (555) 678-9012",
      industry: "education",
      location: "new-york",
      status: "prospect",
      lastInteraction: "2025-01-11T13:45:00Z",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...customers];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.company.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.id.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(customer => customer.status === filters.status);
    }

    // Apply industry filter
    if (filters.industry) {
      filtered = filtered.filter(customer => customer.industry === filters.industry);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(customer => customer.location === filters.location);
    }

    // Apply date range filter (simplified)
    if (filters.dateRange) {
      const now = new Date();
      const filterDate = new Date();

      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          filterDate.setFullYear(1970);
      }

      filtered = filtered.filter(customer => 
        new Date(customer.lastInteraction) >= filterDate
      );
    }

    setFilteredCustomers(filtered);
    setCurrentPage(1);
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailPanelOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setIsAddModalOpen(true);
    setIsDetailPanelOpen(false);
  };

  const handleLogInteraction = (customer) => {
    // In a real app, this would open an interaction logging modal
    console.log('Log interaction for:', customer.name);
  };

  const handleAddNewCustomer = () => {
    setEditingCustomer(null);
    setIsAddModalOpen(true);
  };

  const handleSaveCustomer = (customerData) => {
    if (editingCustomer) {
      // Update existing customer
      const updatedCustomers = customers.map(customer =>
        customer.id === customerData.id ? customerData : customer
      );
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    } else {
      // Add new customer
      const newCustomers = [...customers, customerData];
      setCustomers(newCustomers);
      setFilteredCustomers(newCustomers);
    }
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for customers:', selectedCustomerIds);
    // Implement bulk actions here
    setSelectedCustomerIds([]);
  };

  const handleClearSelection = () => {
    setSelectedCustomerIds([]);
  };

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
              <p className="mt-2 text-muted-foreground">
                Manage customer relationships and track interaction history
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
              <Button
                onClick={handleAddNewCustomer}
                iconName="Plus"
                iconPosition="left"
              >
                Add New Customer
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Filters Panel */}
            <div className="lg:col-span-3">
              <CustomerFilters
                onFiltersChange={handleFiltersChange}
                resultCount={filteredCustomers.length}
              />
            </div>

            {/* Customer Table */}
            <div className="lg:col-span-9">
              <BulkActionsBar
                selectedCount={selectedCustomerIds.length}
                onBulkAction={handleBulkAction}
                onClearSelection={handleClearSelection}
              />

              <CustomerTable
                customers={currentCustomers}
                onCustomerSelect={handleCustomerSelect}
                onEditCustomer={handleEditCustomer}
                onLogInteraction={handleLogInteraction}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length} customers
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      iconName="ChevronLeft"
                    />
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      iconName="ChevronRight"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Customer Detail Panel */}
      <CustomerDetailPanel
        customer={selectedCustomer}
        isOpen={isDetailPanelOpen}
        onClose={() => setIsDetailPanelOpen(false)}
        onEdit={handleEditCustomer}
        onLogInteraction={handleLogInteraction}
      />

      {/* Add/Edit Customer Modal */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveCustomer}
        editingCustomer={editingCustomer}
      />
    </div>
  );
};

export default CustomerManagement;