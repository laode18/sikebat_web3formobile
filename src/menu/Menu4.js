/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import './css/Menu4.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom'

const Menu4 = () => {
  const navigate = useNavigate();

const handleSignOut = () => {
  // Perform sign-out logic here
  // For now, we'll just simulate a sign-out by redirecting back to the login page
  localStorage.removeItem('isLoggedIn')
  navigate('/login')
}

  return (
    <div className="profile-container">
      <div className="profile-details">
        <img src="assets/user.gif" alt="Foto Profil" className="profile-image" />
        <h2>Bayu dan Nei</h2>
        <p>Jenis Kelamin: Laki-laki</p>
        <p>Agama: Islam</p>
        <p>Alamat: Jl. Contoh No. 123</p>
      </div>
      <button onClick={handleSignOut} style={{ marginTop: '50px' }} className="logout-button">Logout</button>
    </div>
  );
};

export default Menu4;
