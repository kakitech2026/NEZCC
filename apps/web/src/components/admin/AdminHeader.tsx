import React from 'react';

export const AdminHeader: React.FC = () => {
  return (
    <header className="nezcc-admin-header">
      <div className="nezcc-admin-header__brand">
        <img
          src="/images/logos/nezcc.png"
          alt="NEZCC Admin Logo"
        />
        <span>Admin Dashboard</span>
      </div>
      <div className="nezcc-admin-header__status">
        Content workspace
      </div>
    </header>
  );
};
