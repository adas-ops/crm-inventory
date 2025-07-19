import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CustomerFilters = ({ onFiltersChange, resultCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [dateRangeFilter, setDateRangeFilter] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'prospect', label: 'Prospect' },
    { value: 'lead', label: 'Lead' }
  ];

  const industryOptions = [
    { value: '', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'education', label: 'Education' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'new-york', label: 'New York' },
    { value: 'california', label: 'California' },
    { value: 'texas', label: 'Texas' },
    { value: 'florida', label: 'Florida' },
    { value: 'illinois', label: 'Illinois' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const handleFilterChange = (filterType, value) => {
    const filters = {
      search: searchQuery,
      status: statusFilter,
      industry: industryFilter,
      location: locationFilter,
      dateRange: dateRangeFilter
    };

    filters[filterType] = value;

    switch (filterType) {
      case 'search':
        setSearchQuery(value);
        break;
      case 'status':
        setStatusFilter(value);
        break;
      case 'industry':
        setIndustryFilter(value);
        break;
      case 'location':
        setLocationFilter(value);
        break;
      case 'dateRange':
        setDateRangeFilter(value);
        break;
    }

    onFiltersChange(filters);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setIndustryFilter('');
    setLocationFilter('');
    setDateRangeFilter('');
    onFiltersChange({
      search: '',
      status: '',
      industry: '',
      location: '',
      dateRange: ''
    });
  };

  const hasActiveFilters = searchQuery || statusFilter || industryFilter || locationFilter || dateRangeFilter;

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          Filters & Search
        </Button>
      </div>

      {/* Filter Content */}
      <div className={`space-y-4 ${!isExpanded ? 'hidden lg:block' : ''}`}>
        {/* Search */}
        <div>
          <Input
            type="search"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <div>
          <Select
            label="Status"
            options={statusOptions}
            value={statusFilter}
            onChange={(value) => handleFilterChange('status', value)}
            placeholder="Select status"
          />
        </div>

        {/* Industry Filter */}
        <div>
          <Select
            label="Industry"
            options={industryOptions}
            value={industryFilter}
            onChange={(value) => handleFilterChange('industry', value)}
            placeholder="Select industry"
          />
        </div>

        {/* Location Filter */}
        <div>
          <Select
            label="Location"
            options={locationOptions}
            value={locationFilter}
            onChange={(value) => handleFilterChange('location', value)}
            placeholder="Select location"
          />
        </div>

        {/* Date Range Filter */}
        <div>
          <Select
            label="Last Interaction"
            options={dateRangeOptions}
            value={dateRangeFilter}
            onChange={(value) => handleFilterChange('dateRange', value)}
            placeholder="Select date range"
          />
        </div>

        {/* Results Count */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Results:</span>
            <span className="font-medium text-foreground">{resultCount}</span>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              className="w-full"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Saved Filters */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Saved Filters</h4>
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left"
              iconName="Star"
              iconPosition="left"
            >
              Active Tech Customers
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left"
              iconName="Star"
              iconPosition="left"
            >
              Recent Prospects
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left"
              iconName="Star"
              iconPosition="left"
            >
              High Value Clients
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFilters;