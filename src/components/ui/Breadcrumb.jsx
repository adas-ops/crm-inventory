import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/main-dashboard': 'Dashboard',
    '/customer-management': 'Customer Management',
    '/inventory-management': 'Inventory Management',
    '/add-edit-inventory-item': 'Add/Edit Item'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    breadcrumbs.push({
      label: 'Dashboard',
      path: '/main-dashboard',
      isActive: location.pathname === '/main-dashboard'
    });

    // Add current page if it's not dashboard
    if (location.pathname !== '/main-dashboard') {
      const currentPageLabel = pathMap[location.pathname];
      if (currentPageLabel) {
        // Handle special case for add/edit inventory item
        if (location.pathname === '/add-edit-inventory-item') {
          breadcrumbs.push({
            label: 'Inventory Management',
            path: '/inventory-management',
            isActive: false
          });
        }
        
        breadcrumbs.push({
          label: currentPageLabel,
          path: location.pathname,
          isActive: true
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render breadcrumbs on login/registration pages
  if (location.pathname === '/login-screen' || location.pathname === '/user-registration-screen') {
    return null;
  }

  const handleBreadcrumbClick = (path, isActive) => {
    if (!isActive) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-muted-foreground" />
      
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          
          <button
            onClick={() => handleBreadcrumbClick(breadcrumb.path, breadcrumb.isActive)}
            className={`transition-colors duration-150 hover:text-foreground ${
              breadcrumb.isActive 
                ? 'text-foreground font-medium cursor-default' 
                : 'text-muted-foreground hover:text-foreground cursor-pointer'
            }`}
            disabled={breadcrumb.isActive}
            aria-current={breadcrumb.isActive ? 'page' : undefined}
          >
            {breadcrumb.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;