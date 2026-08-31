import React from 'react';

export const AdminLogo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
      <img
        src="/images/logos/nezcc.png"
        alt="NEZCC Admin Logo"
        style={{ maxWidth: '100%', height: 'auto', maxHeight: '45px' }}
      />
    </div>
  );
};
