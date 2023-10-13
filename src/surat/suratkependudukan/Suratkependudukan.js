import React, { useState, useEffect } from 'react';
import './Register.css'; // Anda perlu membuat file CSS untuk mengatur tampilan
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Web3 from 'web3'
import { useNavigate } from 'react-router-dom'
import contractkependudukan from './contractkependudukan';
import contract from './contract';
import axios from 'axios';
import api from './api';
import {
    CCol,
    CRow,
  } from '@coreui/react'
  import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import Header from '../../Header';

function Suratkependudukan() {
  const [showPassword, setShowPassword] = useState(false);
  const walletId = localStorage.getItem('walletId')
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [users, setUsers] = useState([]);
  const [kependudukans, setKependudukans] = useState([]);
  const [newKependudukan, setNewKependudukan] = useState({
    userId: '', // Add default values for all fields
    letterNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [fileName, setFileName] = useState('');
  const [editingKependudukan, setEditingKependudukan] = useState(null);
  const [nik, setNIK] = useState(''); // State untuk menyimpan NIK
  const [kkNumber, setKKNumber] = useState(''); // State untuk menyimpan KK Number
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [religion, setReligion] = useState('');
  const [nationality, setNationality] = useState('');
  const [educationStatus, setEducationStatus] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [alamat, setAlamat] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [letterNumberFileName, setLetterNumberFileName] = useState('');
  const backendURL = 'http://localhost:5000';

  useEffect(() => {
    getUsers();
    getKependudukans();
  }, []);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const totalUsers = await contract.methods.totalUsers().call();
      const usersArray = [];

      for (let i = 1; i <= totalUsers; i++) {
        const user = await contract.methods.getUser(i).call();
        if (user.username !== '') {
          usersArray.push(user);
        }
      }

      setUsers(usersArray);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getKependudukans = async () => {
    try {
      setIsLoading(true);
      const totalKependudukans = await contractkependudukan.methods.totalKependudukans().call();
      const kependudukansArray = [];

      for (let i = 1; i <= totalKependudukans; i++) {
        const kependudukan = await contractkependudukan.methods.getKependudukan(i).call();
        if (kependudukan.userId !== '') {
          kependudukansArray.push(kependudukan);
        }
      }

      setKependudukans(kependudukansArray);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file' && files && files.length > 0) {
      const file = files[0];
      if (file.type !== 'application/pdf') {
        alert('File must be in PDF format.');
        return;
      }

      // Move file upload logic to a separate function
      uploadFile(name, file);

    } else if (name === 'username') {
      const selectedUser = users.find((user) => user.username === value);
      if (selectedUser) {
        setNewKependudukan({
          ...newKependudukan,
          [name]: value,
        });

        // Set NIK and KK Number based on selected user
        setNIK(selectedUser.nik);
        setKKNumber(selectedUser.kkNumber);
        setFullName(selectedUser.fullName);
        setBirthDate(selectedUser.birthDate);
        setGender(selectedUser.gender);
        setReligion(selectedUser.religion);
        setNationality(selectedUser.nationality);
        setEducationStatus(selectedUser.educationStatus);
        setMaritalStatus(selectedUser.maritalStatus);
        setOccupation(selectedUser.occupation);
        setAlamat(selectedUser.alamat);
      }
    } else {
      setNewKependudukan((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const uploadFile = (name, file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    axios
      .post(`${backendURL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('File uploaded successfully:', response.data.filename);
        if (name === 'letterNumber') {
          setLetterNumberFileName(response.data.filename);
        }
      })
      .catch((error) => {
        console.error('File upload failed:', error);
      });
  };

  const createKependudukan = async () => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const kependudukanCount = await contractkependudukan.methods.totalKependudukans().call();
      const kependudukanId = parseInt(kependudukanCount) + 1;
      const kependudukanWithId = {
        ...newKependudukan,
        kependudukanId: kependudukanId.toString(),
        letterNumber: letterNumberFileName, // Use the filename for letterNumber
      };
      await contractkependudukan.methods.createKependudukan(kependudukanWithId).send({ from: accounts[0] });
      api.post('/api/surat', kependudukanWithId);
      await getKependudukans();
      setNewKependudukan({
        userId: '', // Reset the state after successful creation
        letterNumber: null, // Reset the letterNumber state after successful creation
      });
      setLetterNumberFileName(null); // Reset the filename state after successful creation
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };  
  
  return (
    <div>
    <Header />
    <div className="login-container" style={{ marginTop: '5px' }}>
          
          <h3 style={{ color: 'white', marginBottom: '5px' }}>Isi Surat Kependudukan</h3>
          <hr style={{ marginBottom: '50px', width: '220px', color: 'white' }} />

          <Form>
          <Form.Group as={Row} hidden>
        <Form.Label column sm="3.5">
          Nama Lengkap
        </Form.Label>
        <Col sm="8.5">
          <Form.Control
            as="select"
            name="userId"
            value={newKependudukan.userId}
            onChange={handleInputChange}
          >
            {users
              .filter((user) => user.walletId === walletId)
              .map((user) => (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
            <p style={{ fontWeight: 'bold', color: 'white', textAlign: 'left', lineHeight: '5px' }}>Nama Lengkap</p>
            {users
              .filter((user) => user.walletId === walletId)
              .map((user) => (
                <input
                  key={user.userId} // Adding a unique key for each input element
                  type="text"
                  value={user.fullName}
                  readOnly 
                />
              ))}
          </div>
          <div style={{ paddingLeft: '3px', paddingRight: '12px', marginBottom: '10px' }} className="password-input">
            <p style={{ fontWeight: 'bold', color: 'white', textAlign: 'left', lineHeight: '5px' }}>NIK</p>
            {users
              .filter((user) => user.walletId === walletId)
              .map((user) => (
                <input
                  key={user.userId} // Adding a unique key for each input element
                  type="text"
                  value={user.nik}
                  readOnly 
                />
              ))}
          </div>
      
      {/* Add more form inputs for other user fields */}
      <Form.Group as={Row}>
        <p style={{ fontWeight: 'bold', color: 'white', textAlign: 'left', lineHeight: '5px', paddingLeft: '6px' }}>Surat Keterangan RT</p>
        <Col sm="8.5">
          <Form.Control
            style={{ backgroundColor: 'white' }}
            type="file"
            accept="application/pdf" // Specify the accepted file type to PDF
            name="letterNumber"
            onChange={handleInputChange}
            required
          />
        </Col>
      </Form.Group>
      <Button style={{ marginTop: '50px' }} variant="primary" onClick={createKependudukan}>
        Tambah
      </Button>{' '}
  </Form>
      </div>
      </div>
  );
};

export default Suratkependudukan;
