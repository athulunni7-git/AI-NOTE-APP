import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/apicalls'


function Register() {
  

  const navigate =useNavigate()
  const [user,setuser] = useState({'username':"",'password':"","email":""})


  async function UserRegister(event){

    event.preventDefault()
    
    console.log("Data sent",user)

    try{

      let res = await register(user)
      console.log("Register Success",res.data)

      if (res.status == "201"){
      navigate('/login')
      
    }

    }catch(error){

    console.log("REGISTER STATUS:", error.response?.status);
    console.log("REGISTER ERROR:", error.response?.data);

    }
    
  }
  return (
    
<div className="container py-5">

  <div className="row justify-content-center">

    <div className="col-md-6 col-lg-5">

      {/* Header */}
      <div className="text-center mb-4">

        <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
          🧠 NOTEAI
        </span>

        <h1 className="fw-bold text-dark mb-2">
          Create Your Account
        </h1>

        <p className="text-muted mb-0">
          Start organizing your thoughts with AI-powered notes.
        </p>

      </div>


      {/* Register Card */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4 p-md-5">

          <h5 className="fw-bold text-dark mb-1">
            Create an account
          </h5>

          <p className="text-muted small mb-4">
            Enter your details to get started.
          </p>


          <form onSubmit={UserRegister}>

            {/* Username */}
            <div className="mb-3">

              <label className="form-label fw-semibold">
                Username
              </label>

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter your username"
                onChange={(event) =>
                  setuser({
                    ...user,
                    username: event.target.value
                  })
                }
              />

            </div>


            {/* Email */}
            <div className="mb-3">

              <label className="form-label fw-semibold">
                Email
              </label>

              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter your email"
                onChange={(event) =>
                  setuser({
                    ...user,
                    email: event.target.value
                  })
                }
              />

            </div>


            {/* Password */}
            <div className="mb-4">

              <label className="form-label fw-semibold">
                Password
              </label>

              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Create a password"
                onChange={(event) =>
                  setuser({
                    ...user,
                    password: event.target.value
                  })
                }
              />

            </div>


            {/* Register Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
            >
              Create Account →
            </button>

          </form>

        </div>

      </div>


      {/* Footer */}
      <div className="text-center mt-4">

        <small className="text-muted">
          Already have an account?
        </small>

        <button className="btn btn-link text-primary fw-semibold text-decoration-none" onClick={()=>navigate('/login')}>
          Login
        </button>

      </div>

    </div>

  </div>

</div>


  )
}

export default Register
