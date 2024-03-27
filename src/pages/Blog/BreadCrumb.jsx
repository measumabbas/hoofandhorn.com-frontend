import React from 'react'
import '../Services/BreadCrumb.css'
import { Link } from "react-router-dom";

function BreadCrumb() {
  return (
    <div>
      <div class="breadcrumb">
      <nav>
        <ol>
          <li>
            <Link to="/" className='home'>Home</Link>
          </li>
          <li>
            <div className='second'>
          <span>/</span>
            <span className='second-text'>Blogs</span>
            </div>
           
          </li>
        </ol>
      </nav>
      </div>
    </div>
  )
}

export default BreadCrumb