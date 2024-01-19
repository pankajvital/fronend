import { useState } from "react"
import axios from 'axios'
import {Link, useNavigate } from "react-router-dom"
import { urlbc } from "../components/Constants"

const Newsubmit = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log(otp, password)
        axios.post(`${urlbc}/submit-otp`,
            {
                otp: otp,
                password: password,
            })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
                    navigate('/signin')
                    alert('Password Updated.')
                } else {
                    alert('server err / wrong OTP')
                }
            }).catch(err => {
                console.log(err)
            })
    }
  return (
    <>
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Link to="index.html" className="">
                  <h3 className="text-primary">
                    <i className="fa fa-user-edit me-2" />
                    DarkPan
                  </h3>
                </Link>
                <h3>Update PASSWORD</h3>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="OTP"
                  onChange={(e) => {
                    setOtp(e.target.value)
                }}
                value={otp}
                />
                <label htmlFor="floatingInput">OTP</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="New Password"
                  value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <label htmlFor="floatingPassword">New Password</label>
              </div>
              
              <button type="submit" onClick={handleSubmit} className="btn btn-primary py-3 w-100 mb-4">
                Change Password
              </button>
              <p className="text-center mb-0">
                Don't have an Account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Newsubmit
