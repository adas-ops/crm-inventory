import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginScreen from "pages/login-screen";
import UserRegistrationScreen from "pages/user-registration-screen";
import AddEditInventoryItem from "pages/add-edit-inventory-item";
import MainDashboard from "pages/main-dashboard";
import InventoryManagement from "pages/inventory-management";
import CustomerManagement from "pages/customer-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MainDashboard />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/user-registration-screen" element={<UserRegistrationScreen />} />
        <Route path="/add-edit-inventory-item" element={<AddEditInventoryItem />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/customer-management" element={<CustomerManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;