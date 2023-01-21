import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const Navbar=()=> {

  return (
    <>
      <nav className='flex border-black border-b-[1.5px]'>
        <div className='w-full inline-flex'>
          <div>
            <img src={logo}/>
          </div>
          <div className='w-full inline-flex items-center text-center'>
            <Link to='/about' className='grow'>
              <span className='grow'>
                About
              </span>
            </Link>
            <Link to='/' className='grow'>
              <span>
                Home
              </span>
            </Link>
          </div>

          
        </div>
      </nav>
    </>
  )
}

export default Navbar
