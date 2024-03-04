// src/components/Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import './Navbar.css';

const Navbar = () => {
  let navigate=useNavigate();
  return (
    
    <nav className="navbar">
      <ul>
    
        <NavLink className="menu" to={"/AddCustomer"}>Add Customer</NavLink>
       
        <button onClick={() => { navigate("/AddCustomer") }} className='addcustomer'>Add Customer</button>
        <button onClick={() => { navigate(-1) }} className='logout'>Logout</button>
      </ul>
    </nav>
  );
};

export default Navbar;


// Navbar.js
// Navbar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useEmployeeContext } from './EmployeeContext';

// const Navbar = () => {
//   const { isLoggedIn, logout } = useEmployeeContext();

//   return (
//     <nav>
//       <Link to="/">Home</Link>
//       <Link to="/about">About</Link>
//       <Link to="/.LoginForm">LoginForm</Link>
//       {isLoggedIn && (
//         <>
//           <Link to="/addcustomer">Add Customer</Link>
//           <Link to="/customerdetails">Customer Details</Link>
//           <Link to="/translations">Translations</Link>
//           <button onClick={logout}>Logout</button>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

