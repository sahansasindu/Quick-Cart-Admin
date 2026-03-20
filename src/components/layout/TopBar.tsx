import React from 'react';
import { useLocation } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const location = useLocation();


  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/': return 'Dashboard Overview';
      case '/add-category': return 'Create New Category';
      case '/manage-categories': return 'Manage Categories';
      case '/add-product': return 'Create New Product';
      case '/manage-products': return 'Manage Products';
      case '/add-discount': return 'Create New Discount';
      case '/manage-discounts': return 'Manage Discounts';
      default: return 'Admin Panel';
    }
  };

  return (
    <header className="top-bar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          className="menu-toggle-btn"
          onClick={onMenuClick}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <span className="top-bar-title">{getPageTitle(location.pathname)}</span>
      </div>

      <div className="top-bar-user">
        <div className="top-bar-user-info" style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', margin: 0, color: 'white' }}>Admin User</p>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>System Administrator</p>
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600',
          color: 'white'
        }}>
          AD
        </div>
      </div>
    </header>
  );
};

export default TopBar;
