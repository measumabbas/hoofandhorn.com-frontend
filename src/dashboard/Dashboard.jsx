import React from 'react';
import { useDispatch } from 'react-redux';
import { clearState } from '../features/auth/loginSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearState());
    navigate('/login')
    window.alert('Logout Successfully')
  };


  return (
    <div className='dashbboard container'>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Dashboard