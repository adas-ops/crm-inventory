import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CustomerTable = ({ customers, onCustomerSelect, onEditCustomer, onLogInteraction }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map(customer => customer.id));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      prospect: { color: 'bg-warning text-warning-foreground', label: 'Prospect' },
      lead: { color: 'bg-accent text-accent-foreground', label: 'Lead' }
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'lastInteraction') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? "ArrowUp" : "ArrowDown"} 
        size={14} 
        className="text-foreground" 
      />
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedCustomers.length === customers.length && customers.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Customer</span>
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('company')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Company</span>
                  <SortIcon field="company" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-foreground">Contact</span>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('lastInteraction')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Last Interaction</span>
                  <SortIcon field="lastInteraction" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Status</span>
                  <SortIcon field="status" />
                </button>
              </th>
              <th className="text-right px-4 py-3">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-border hover:bg-muted/50 cursor-pointer transition-colors duration-150"
                onClick={() => onCustomerSelect(customer)}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                      {customer.avatar ? (
                        <Image
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon name="User" size={20} className="text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-foreground">{customer.company}</div>
                    <div className="text-sm text-muted-foreground">{customer.industry}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="Mail" size={14} className="text-muted-foreground" />
                      <span className="text-foreground">{customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="Phone" size={14} className="text-muted-foreground" />
                      <span className="text-foreground">{customer.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground">{formatDate(customer.lastInteraction)}</div>
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(customer.status)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCustomer(customer);
                      }}
                      iconName="Edit"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLogInteraction(customer);
                      }}
                      iconName="MessageSquare"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCustomerSelect(customer);
                      }}
                      iconName="Eye"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden">
        {sortedCustomers.map((customer) => (
          <div
            key={customer.id}
            className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors duration-150"
            onClick={() => onCustomerSelect(customer)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={() => handleSelectCustomer(customer.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded border-border mt-1"
                />
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                  {customer.avatar ? (
                    <Image
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon name="User" size={24} className="text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-foreground">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">{customer.title}</div>
                </div>
              </div>
              {getStatusBadge(customer.status)}
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Building" size={14} className="text-muted-foreground" />
                <span className="text-foreground">{customer.company}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{customer.industry}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Mail" size={14} className="text-muted-foreground" />
                <span className="text-foreground">{customer.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-foreground">{customer.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Last interaction: {formatDate(customer.lastInteraction)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditCustomer(customer);
                }}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onLogInteraction(customer);
                }}
                iconName="MessageSquare"
                iconPosition="left"
              >
                Log
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {customers.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No customers found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search criteria or add a new customer.</p>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Add New Customer
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;