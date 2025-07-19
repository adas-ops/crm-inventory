import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');

  const bulkActionOptions = [
    { value: '', label: 'Select action...' },
    { value: 'export', label: 'Export Selected' },
    { value: 'update-status', label: 'Update Status' },
    { value: 'assign-tag', label: 'Assign Tag' },
    { value: 'send-email', label: 'Send Email' },
    { value: 'delete', label: 'Delete Selected' }
  ];

  const handleActionExecute = () => {
    if (selectedAction) {
      onBulkAction(selectedAction);
      setSelectedAction('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary text-primary-foreground p-4 rounded-lg mb-4 animate-slide-down">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} />
            <span className="font-medium">
              {selectedCount} customer{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Select action..."
              className="min-w-48"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleActionExecute}
              disabled={!selectedAction}
              iconName="Play"
              iconPosition="left"
            >
              Execute
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          iconName="X"
          iconPosition="left"
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          Clear Selection
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;