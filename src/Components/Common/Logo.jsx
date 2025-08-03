import React from 'react';

function Logo({ width = '40px' }) {
  return (
    <img
      src="/logo.png"
      alt="BlogZone Logo"
      style={{ width }}
      className="w-3"
    />
  );
}

export default Logo;
