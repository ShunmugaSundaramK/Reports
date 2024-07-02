import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import './style.scss'
import menu from '../../Assests/menu.svg'

const SideNavBar = () => {
  const location = useLocation()
  const [drop, setDrop] = useState(false)
  const [activeLink, setActiveLink] = useState(location.pathname)

  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location])

  return (
    <div className='sideNavBar'>
      <h3>REPORTS</h3>
      <div className='menubarbox'>
        <div className=''>
          <div className='menuBarImg'>
            <img src={menu} alt='' onClick={() => setDrop(!drop)} />
          </div>
        </div>
      </div>
      {drop && (
        <div className='dropDown'>
          <Link to='/' className={activeLink === '/' ? 'active' : ''}>
            <p>Payment</p>
            {/* {activeLink === '/' && <hr />} */}
          </Link>
          <Link to='/expenseReport' className={activeLink === '/expenseReport' ? 'active' : ''}>
            <p>Expense</p>
            {/* {activeLink === '/expenseReport' && <hr />} */}
          </Link>
          <Link to='/eodReport' className={activeLink === '/eodReport' ? 'active' : ''}>
            <p>EOD</p>
            {/* {activeLink === '/eodReport' && <hr />} */}
          </Link>
          <Link to='/customerReport' className={activeLink === '/customerReport' ? 'active' : ''}>
            <p>Customer</p>
            {/* {activeLink === '/customerReport' && <hr />} */}
          </Link>
          <Link to='/checkInReport' className={activeLink === '/checkInReport' ? 'active' : ''}>
            {/* <p>Check In</p>
            {activeLink === '/checkInReport' && <hr />} */}
          </Link>
          <Link to='/transaction' className={activeLink === '/transaction' ? 'active' : ''}>
            <p>Transaction</p>
            {/* {activeLink === '/transaction' && <hr />} */}
          </Link>
          <Link to='/salesReport' className={activeLink === '/salesReport' ? 'active' : ''}>
            <p>Sales</p>
            {/* {activeLink === '/salesReport' && <hr />} */}
          </Link>
          <Link to='/orderReport' className={activeLink === '/orderReport' ? 'active' : ''}>
            <p>Order</p>
            {/* {activeLink === '/orderReport' && <hr />} */}
          </Link>
        </div>
      )}
      <div className='container'>
        <ul className='category'>
          <li className={activeLink === '/' ? 'active' : ''}>
            <Link to="/" onClick={() => setActiveLink('/')}>Payment</Link>
            {/* {activeLink === '/' && <hr />} */}
          </li>
        </ul>
      </div>
      <div className='container'>
        <ul className='category'>
          <li className={activeLink === '/expenseReport' ? 'active' : ''}>
            <Link to="/expenseReport" onClick={() => setActiveLink('/expenseReport')}>Expense</Link>
            {/* {activeLink === '/expenseReport' && <hr />} */}
          </li>
        </ul>
      </div>
      <div className='container'>
        <ul className='category'>
          <li className={activeLink === '/eodReport' ? 'active' : ''}>
            <Link to="/eodReport" onClick={() => setActiveLink('/eodReport')}>EOD</Link>
            {/* {activeLink === '/eodReport' && <hr />} */}
          </li>
        </ul>
      </div>
      <div className='container'>
        <ul className='category'>
          <li className={activeLink === '/customerReport' ? 'active' : ''}>
            <Link to="/customerReport" onClick={() => setActiveLink('/customerReport')}>Customer</Link>
            {/* {activeLink === '/customerReport' && <hr />} */}
          </li>
        </ul>
      </div>
      <div className='container'>
        <ul className='category'>
          <li className={activeLink === '/checkInReport' ? 'active' : ''}>
            <Link to="/checkInReport" onClick={() => setActiveLink('/checkInReport')}>Check In</Link>
            {/* {activeLink === '/checkInReport' && <hr />} */}
          </li>
        </ul>
      </div>
      <div className='container'>
        <ul className='category'>
          <li className={activeLink === '/transaction' ? 'active' : ''}>
            <Link to="/transaction" onClick={() => setActiveLink('/transaction')}>Transaction</Link>
            {/* {activeLink === '/transaction' && <hr />} */}
          </li>
        </ul>
      </div>
      <div className='container'>
        <ul className='category'>
          <li className={activeLink === '/salesReport' ? 'active' : ''}>
            <Link to="/salesReport" onClick={() => setActiveLink('/salesReport')}>Sales</Link>
            {/* {activeLink === '/salesReport' && <hr />} */}
          </li>
        </ul>
      </div>
      <div className='container'>
        <ul className='category'>
          <li className={activeLink === '/orderReport' ? 'active' : ''}>
            <Link to="/orderReport" onClick={() => setActiveLink('/orderReport')}>Order</Link>
            {/* {activeLink === '/orderReport' && <hr />} */}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideNavBar
