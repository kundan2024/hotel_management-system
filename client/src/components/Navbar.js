import React from 'react'

function Navbar(){
  const user=JSON.parse(localStorage.getItem('currentUser'));

  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }

    return(
        <div>
            <nav class="navbar navbar-expand-lg ">
  <a class="navbar-brand " href="/home"><h3 className='ml-3'>Home</h3></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse mr-2" id="navbarNav">
    <ul className="navbar-nav ">
      {
      user?(<>
      <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle mr-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <b>{user.data.name}</b>
  </button>
  <div class="dropdown-menu " style={{marginRight:"50px"}} aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item " href="/profile">Profile</a>
    <a class="dropdown-item "  onClick={logout}>Log Out</a>
  </div>
</div>
      
      </>):

      <>
      <li className="nav-item active">
        <a className="nav-link" href="/login">Login</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/register">Register</a>
      </li>
      </>
      
      }
    </ul>
  </div>
</nav>
        </div>
    )
}
export default Navbar;