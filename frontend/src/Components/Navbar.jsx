import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ islogin, setIslogin }) {
  const navigate = useNavigate()
  async function Userlogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIslogin(false)

      navigate('/login')

      
    }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand ms-4" href="#">
            NoteAI
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"></li>
              {!islogin && (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link" href="#">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" href="#">
                      Login
                    </Link>
                  </li>
                </>
              )}
              {islogin && (
                <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link" href="#">
                      My Note
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/addnote" className="nav-link" href="#">
                      Add note
                    </Link>
                  </li>
                  <li>
                    <button
                      className="nav-link btn btn-link"
                      onClick={Userlogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
