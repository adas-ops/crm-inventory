import React from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ 
  isAutoSaving, 
  lastSaved, 
  autoSaveEnabled 
}) => {
  const formatLastSaved = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const now = new Date();
    const saved = new Date(timestamp);
    const diffInSeconds = Math.floor((now - saved) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    
    return saved.toLocaleDateString();
  };

  if (!autoSaveEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg shadow-floating p-3 z-50">
      <div className="flex items-center space-x-2">
        {isAutoSaving ? (
          <>
            <div className="animate-spin">
              <Icon name="Loader2" size={16} className="text-primary" />
            </div>
            <span className="text-sm text-foreground">Auto-saving...</span>
          </>
        ) : (
          <>
            <Icon name="Check" size={16} className="text-success" />
            <span className="text-sm text-foreground">
              Last saved: {formatLastSaved(lastSaved)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default AutoSaveIndicator;