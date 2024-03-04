import React, { useEffect, useState } from 'react'
import logo from './DIT BANK.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';


const Upload = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const location = useLocation();
  let navigate = useNavigate();
  const { account } = location.state;
  useEffect(() => {
    if (location.state && location.state.data) {
      setSelectedCustomer(location.state.data);
    }
  }, [location.state]);

  const handleUploadFiles = async () => {
    if (selectedCustomer && selectedCustomer.Ac) {
        navigate("/UploadFile",{ state: { account: selectedCustomer.Ac } })
        console.log(selectedCustomer);
    } else {
        console.error("selectedCustomer is null or doesn't have the 'Ac' property");
    }
};

  
  let num = 1;
  return (
    <div>
      <nav className='nav'>
        <img src={logo} alt='logo' width={100} height={100} />
        <NavLink className='back menu' to={-1}>
          Home
        </NavLink>
      </nav>
      <button onClick={handleUploadFiles}>Upload Files</button>
      {selectedCustomer && selectedCustomer.files && (
        <ul>
          <h3>Uploaded Files:</h3>
          {selectedCustomer.files.map((file, index) => (
            <li key={index}>
              <p><a>File Name:</a> {file.name}</p>
              <p><a>Type:</a> {file.type}</p>
              <p><a>Size:</a> {file.size}</p>
              <p><a>Pages:</a> {file.pages}</p>
              <p><a>URL:</a> {file.url}</p>
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}

export default Upload