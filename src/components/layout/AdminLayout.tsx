import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import TopBar from './TopBar';

const AdminLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="admin-layout">
      <TopBar onMenuClick={handleToggle} />

      <SideBar
        isOpen={isMobileMenuOpen}
        isCollapsed={isCollapsed}
        onClose={closeMobileMenu}
      />

      <div className={`admin-main ${isCollapsed ? 'collapsed' : ''}`}>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>


      {isMobileMenuOpen && (
        <div
          className="modal-overlay"
          onClick={closeMobileMenu}
          style={{ zIndex: 1000, background: 'rgba(0,0,0,0.3)' }}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
