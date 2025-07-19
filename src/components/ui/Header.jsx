import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'LayoutDashboard' },
    { label: 'Customers', path: '/customer-management', icon: 'Users' },
    { label: 'Inventory', path: '/inventory-management', icon: 'Package' }
  ];

  const mockSearchResults = [
    { type: 'customer', name: 'John Smith', id: 'CUST001' },
    { type: 'customer', name: 'Sarah Johnson', id: 'CUST002' },
    { type: 'inventory', name: 'Wireless Headphones', sku: 'WH001', stock: 45 },
    { type: 'inventory', name: 'Bluetooth Speaker', sku: 'BS002', stock: 12 }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = mockSearchResults.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        (item.id && item.id.toLowerCase().includes(query.toLowerCase())) ||
        (item.sku && item.sku.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (result) => {
    if (result.type === 'customer') {
      navigate('/customer-management');
    } else if (result.type === 'inventory') {
      navigate('/inventory-management');
    }
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">CRM Inventory</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center ml-8 space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8 relative" ref={searchRef}>
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search customers, inventory..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Search Results */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-dropdown z-1100 animate-slide-down">
              <div className="py-2 max-h-64 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors duration-150 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">{result.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {result.type === 'customer' ? `ID: ${result.id}` : `SKU: ${result.sku}`}
                      </div>
                    </div>
                    {result.type === 'inventory' && (
                      <div className="text-xs text-muted-foreground">
                        Stock: {result.stock}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Search Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Icon name="Search" size={20} />
        </Button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors duration-150"
          >
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-sm font-medium text-foreground">Admin User</div>
              <div className="text-xs text-muted-foreground">Administrator</div>
            </div>
            <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
          </button>

          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-dropdown z-1100 animate-scale-in">
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors duration-150 flex items-center space-x-2">
                  <Icon name="User" size={16} />
                  <span>Profile Settings</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors duration-150 flex items-center space-x-2">
                  <Icon name="Settings" size={16} />
                  <span>Preferences</span>
                </button>
                <div className="border-t border-border my-1"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors duration-150 flex items-center space-x-2 text-destructive"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-down">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-1200 animate-fade-in">
          <div className="p-4">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search customers, inventory..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-muted border border-border rounded-md text-base placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Icon name="X" size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Mobile Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 space-y-2">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full p-4 bg-card border border-border rounded-md text-left hover:bg-muted transition-colors duration-150"
                  >
                    <div className="font-medium text-foreground">{result.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {result.type === 'customer' ? `Customer ID: ${result.id}` : `SKU: ${result.sku} • Stock: ${result.stock}`}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;