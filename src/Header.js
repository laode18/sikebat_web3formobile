import React, { useState } from 'react';
import './Header.css';
import withAuth from './authMiddleware'

const Header = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const handleNotificationIconClick = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <header className="header">
      <div className="left-content">
        <img src="assets/logo.png" alt="Logo" />
        <h1 style={{ fontSize: '28px' }}>SIM Kelurahan</h1>
      </div>
      <div className="right-content">
        <div className="notification-container">
          <img
            src="assets/bell.png"
            alt="Notification Icon"
            onClick={handleNotificationIconClick}
          />
          {isNavbarVisible && (
            <div className="navbar" style={{ color: 'black' }}>
              <h3 style={{ paddingLeft: '5px', marginTop: '0px' }}>Notification</h3>
              <div style={{ paddingLeft: '10px'}}>
                <p>Notification 1</p>
                <p>Notification 2</p>
              </div>
              {/* Add more notifications here */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default withAuth(['user'])(Header)
