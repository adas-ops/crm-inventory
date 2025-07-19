import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CustomerDetailPanel = ({ customer, isOpen, onClose, onEdit, onLogInteraction }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !customer) return null;

  const mockInteractionHistory = [
    {
      id: 1,
      type: 'email',
      subject: 'Follow-up on product demo',
      date: '2025-01-15T10:30:00Z',
      status: 'sent',
      notes: 'Sent follow-up email after product demonstration. Customer showed interest in enterprise features.'
    },
    {
      id: 2,
      type: 'call',
      subject: 'Product demonstration call',
      date: '2025-01-12T14:00:00Z',
      status: 'completed',
      notes: 'Conducted 45-minute product demo. Customer asked about pricing and implementation timeline.'
    },
    {
      id: 3,
      type: 'meeting',
      subject: 'Initial consultation',
      date: '2025-01-08T09:00:00Z',
      status: 'completed',
      notes: 'First meeting to understand customer requirements. Discussed current pain points and potential solutions.'
    }
  ];

  const mockNotes = [
    {
      id: 1,
      content: 'Customer is very interested in our enterprise solution. They have a budget of $50K and are looking to implement by Q2.',
      author: 'John Smith',
      date: '2025-01-15T16:45:00Z'
    },
    {
      id: 2,
      content: 'Technical team will need to review integration requirements. Customer uses Salesforce and needs API compatibility.',
      author: 'Sarah Johnson',
      date: '2025-01-12T11:20:00Z'
    }
  ];

  const getInteractionIcon = (type) => {
    const icons = {
      email: 'Mail',
      call: 'Phone',
      meeting: 'Calendar',
      note: 'FileText'
    };
    return icons[type] || 'MessageSquare';
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'interactions', label: 'Interactions', icon: 'MessageSquare' },
    { id: 'notes', label: 'Notes', icon: 'FileText' }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-1/2 xl:w-2/5">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 lg:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative h-full bg-card border-l border-border shadow-modal animate-slide-down lg:animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
          <div className="flex items-center space-x-3">
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
              <h2 className="text-lg font-semibold text-foreground">{customer.name}</h2>
              <p className="text-sm text-muted-foreground">{customer.title} at {customer.company}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(customer)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-4 lg:px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors duration-150 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Status and Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    {getStatusBadge(customer.status)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Industry</label>
                  <p className="mt-1 text-sm text-foreground">{customer.industry}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{customer.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{customer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{customer.location}</span>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Company Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Building" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{customer.company}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Users" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{customer.companySize || '50-100 employees'}</span>
                  </div>
                </div>
              </div>

              {/* Last Interaction */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Last Interaction</h3>
                <p className="text-sm text-muted-foreground">{formatDate(customer.lastInteraction)}</p>
              </div>
            </div>
          )}

          {activeTab === 'interactions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Interaction History</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onLogInteraction(customer)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Log Interaction
                </Button>
              </div>

              <div className="space-y-4">
                {mockInteractionHistory.map((interaction) => (
                  <div key={interaction.id} className="flex space-x-3 p-4 bg-muted rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Icon name={getInteractionIcon(interaction.type)} size={16} color="white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-foreground">{interaction.subject}</h4>
                        <span className="text-xs text-muted-foreground">{formatDate(interaction.date)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{interaction.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Customer Notes</h3>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Note
                </Button>
              </div>

              <div className="space-y-4">
                {mockNotes.map((note) => (
                  <div key={note.id} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(note.date)}</span>
                    </div>
                    <p className="text-sm text-foreground">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPanel;