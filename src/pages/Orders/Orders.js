import React from 'react'
import './style.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
const Orders = () => {
  return (
    <div className='container'>
      <Navbar />
      <div style={{minHeight:'70vh'}}></div>
      <Footer/>
    </div>
  )
}

export default Orders
