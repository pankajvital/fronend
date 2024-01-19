import  {React,useState} from 'react'
import axios from "axios"
import { Link,useNavigate } from 'react-router-dom';

const Forgetpassword = () => {
    const navigate = useNavigate(); // Use the navigate function from react-router-dom
  const [email, setEmail] = useState('');
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(email)
    if (!email) {
      alert("email is required fields.");
      return;
    }
    axios.post('http://localhost:5000/send-otp',
    {
      email:email
    })
    .then(res=>{
      console.log(res.data)
      if(res.data.code === 200){
        navigate('/send-otp')
      }
      if(res.data.code === 400){
        alert(`User already exists`)
      }
 
    }).catch(err =>{
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
                <h3>ForgetPassword</h3>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" autoComplete='true'
                />
                <label htmlFor="floatingInput">Email</label>
              </div>
              
              <button type="submit" onClick={handleSubmit} className="btn btn-primary py-3 w-100 mb-4">
              Send OTP
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Forgetpassword
