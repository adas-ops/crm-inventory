import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({ 
  isEditing, 
  isLoading, 
  onSave, 
  onSaveAndAddAnother, 
  onCancel, 
  hasUnsavedChanges 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Icon name="Save" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {hasUnsavedChanges ? 'You have unsaved changes' : 'All changes saved'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          {!isEditing && (
            <Button
              variant="secondary"
              onClick={onSaveAndAddAnother}
              loading={isLoading}
              iconName="Plus"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Save & Add Another
            </Button>
          )}

          <Button
            variant="default"
            onClick={onSave}
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            {isEditing ? 'Update Item' : 'Save Item'}
          </Button>
        </div>
      </div>

      {hasUnsavedChanges && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div className="text-sm">
              <p className="text-warning font-medium">Unsaved Changes</p>
              <p className="text-muted-foreground">
                Make sure to save your changes before leaving this page.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormActions;