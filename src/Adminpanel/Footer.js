import React from 'react'
import { Link } from 'react-router-dom'
import { companyName } from '../components/Constants'
const Footer = () => {
  return (
    <>
    <div className="container-fluid pt-4 px-4">
  <div className="bg-secondary rounded-top p-4">
    <div className="row">
      <div className="col-12 col-sm-6 text-center text-sm-start">
        © <Link to="/">{companyName}</Link>, All Right Reserved.
      </div>
      <div className="col-12 col-sm-6 text-center text-sm-end">
        
        Designed By <Link to="/">Zustravel</Link>
        
      </div>
    </div>
  </div>
</div>


    </>
  )
}

export default Footer
