import React, { useState, useEffect } from 'react';
import './Register.css'; // Anda perlu membuat file CSS untuk mengatur tampilan
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Web3 from 'web3'
import { useNavigate } from 'react-router-dom'
import {
    CCol,
    CRow,
  } from '@coreui/react'

function Registernext() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [username, setUsername] = useState('')
  const [nik, setNik] = useState('')
  const [kkNumber, setKknumber] = useState('')
  const [fullname, setFullname] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [gender, setGender] = useState('')
  const [religion, setReligion] = useState('')
  const [nationality, setNationality] = useState('')
  const [educationStatus, setEducationstatus] = useState('')
  const [maritalStatus, setMaritalstatus] = useState('')
  const [occupation, setOccupation] = useState('')
  const [alamat, setAlamat] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [walletId, setWalletId] = useState('')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    checkWalletConnection()
    // eslint-disable-next-line no-undef
    ethereum.on('accountsChanged', handleAccountChange)
    return () => {
      // eslint-disable-next-line no-undef
      ethereum.removeListener('accountsChanged', handleAccountChange)
    }
  }, [])

  const handleAccountChange = (accounts) => {
    if (accounts.length > 0) {
      setIsWalletConnected(true)
      formatWalletId(accounts[0])
    } else {
      setIsWalletConnected(false)
      setWalletId('')
    }
  }

  const formatWalletId = (address) => {
    if (address && address.length >= 6) {
      const shortenedAddress = address.slice(0, 5) + '.........' + address.slice(-3)
      setWalletId(shortenedAddress)
    } else {
      setWalletId('')
    }
  }

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      try {
        const accounts = await window.web3.eth.getAccounts()
        if (accounts.length > 0) {
          setIsWalletConnected(true)
          formatWalletId(accounts[0])
        }
      } catch (error) {
        console.error('Error connecting to wallet:', error)
      }
    } else {
      setIsWalletConnected(false)
      setErrorMessage('Please install MetaMask to connect.')
    }
  }

  const handleConnectMetamask = async () => {
    if (!isWalletConnected && !isConnecting) {
      setIsConnecting(true);
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setIsConnecting(false);
          checkWalletConnection();
        } catch (error) {
          console.error('Error connecting to wallet:', error);
          setIsConnecting(false);
        }
      } else {
        setIsConnecting(false);
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    }
  };  

  return (
    <><div className="login-container" style={{ marginTop: '70px' }}>
          <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}
          >
              <img
                  className="img"
                  src="/assets/logo.png"
                  alt=""
                  style={{ width: 100, height: 100, marginRight: '10px' }} />
          </div>
          <h3 style={{ color: 'white', marginBottom: '50px' }}>Isi Biodata</h3>

          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="NIK"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)} />
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="Nomor KK"
                  value={kkNumber}
                  onChange={(e) => setKknumber(e.target.value)} />
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="Nama Lengkap"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)} />
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="Tanggal Lahir"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)} />
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="Jenis Kelamin"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)} />
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="Agama"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)} />
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="Kewarganegaraan"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)} />
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="Status Pendidikan"
                  value={educationStatus}
                  onChange={(e) => setEducationstatus(e.target.value)} />
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="Status Perkawinan"
                  value={maritalStatus}
                  onChange={(e) => setMaritalstatus(e.target.value)} />
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="Pekerjaan"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)} />
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
              <input
                  type={'text'}
                  placeholder="Alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)} />
          </div>

          <button style={{ marginBottom: '30px', marginTop: '20px' }}>Simpan</button>
      </div>
      </>
  );
};

export default Registernext;
