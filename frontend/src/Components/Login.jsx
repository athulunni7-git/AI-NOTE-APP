import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/apicalls'

function Login({setIslogin}) {

  const navigate = useNavigate()
  const [user,setuser] = useState({'username':"",'password':''})

  async function userlogin(event) {

    event.preventDefault()
    console.log(user)

    let res = await login(user)
    if (res.status == 200){
    localStorage.setItem('Access',res.data['access']);
    localStorage.setItem('Refresh',res.data['refresh']);
    setIslogin(true)
    
    console.log("Access token:", localStorage.getItem("Access"));
    console.log("Refresh token:", localStorage.getItem("Refresh"));

    navigate('/')
  
  
      
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
          Welcome Back
        </h1>

        <p className="text-muted mb-0">
          Login to continue managing your notes.
        </p>

      </div>


      {/* Login Card */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4 p-md-5">

          <h5 className="fw-bold text-dark mb-1">
            Login to your account
          </h5>

          <p className="text-muted small mb-4">
            Enter your credentials to access your workspace.
          </p>


          <form onSubmit={userlogin}>

            {/* Username */}
            <div className="mb-3">

              <label className="form-label fw-semibold">
                Username
              </label>

              <input
                type="text"
                className="form-control form-control-lg"
                onChange={(event) =>
                  setuser({
                    ...user,
                    username: event.target.value
                  })
                }
                placeholder="Enter your username"
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
                onChange={(event) =>
                  setuser({
                    ...user,
                    password: event.target.value
                  })
                }
                placeholder="Enter your password"
              />

            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
            >
              Login →
            </button>

          </form>

        </div>

      </div>


      {/* Register Link */}
      <div className="text-center mt-4">

        <small className="text-muted">
          Don't have an account?
        </small>

        <button className="btn btn-link text-primary fw-semibold text-decoration-none" onClick={()=>navigate('/register')}>
          Create an account
        </button>

      </div>

    </div>

  </div>

</div>

  )
}

export default Login
