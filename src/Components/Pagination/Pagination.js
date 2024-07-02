import React, { useState } from 'react';
import './style.scss';
import arrow from '../../Assests/san.svg'

const Pagination = ({currentPage, setCurrentPage, nPage, records}) => {
  
  const prePage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }
 
  const nextPage = () => {
    if(currentPage < nPage){
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className='pagination'>
      <div className='table'>
        <div className='tableHeader'>
          <p className='header'>#Order</p>
          <p className='header'>Date</p>
          <p className='header'>Order Info</p>
          <p className='header'>Customer</p>
          <p className='header'>Contact</p>
          <p className='header'>Due</p>
          <p className='header'>Location</p>
        </div>
        <div className='tableBody'>
          {records.map((item, index) => (
            <div className='tableRow' key={index}>
              <p className='tableCell'>{item.order}</p>
              <p className='tableCell'>{item.date}</p>
              <p className='tableCell'>{item.orderInfo.join(', ')}</p>
              <p className='tableCell'>{item.customer}</p>
              <p className='tableCell'>{item.contact}</p>
              <p className='tableCell'>{item.due}</p>
              <p className='tableCell'>{item.location}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='paginationCursor'>
            <ul className='pagenationContainer'>
                {currentPage > 1 && <li className='page-item'>
                    <img className='leftArrow' src={arrow} alt='' onClick={prePage}/>
                </li>}
                <li>Page {currentPage} - {nPage}</li>
                <li className='page-item'>
                    <img src={arrow} alt='' onClick={nextPage}/>
                </li>
            </ul>
        </div>
    </div>
  );
};

export default Pagination;
