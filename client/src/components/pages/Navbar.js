import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Social Media App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Navigation</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ol className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Navbar;