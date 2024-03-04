import React, { useContext, useState } from 'react';
import { MyContext } from './MyContextProvider';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { VscEye, VscEdit, VscTrash, VscHistory } from "react-icons/vsc";
import logo from './DIT BANK.png'
import { CgProfile } from 'react-icons/cg';
const Access2 = () => {
  const { update, myData } = useContext(MyContext);

  const [query, setQuery] = useState("");
  const location = useLocation()

  const { username } = location.state;

  let navigate = useNavigate();
  const data = myData.filter(item => {
    if (query === "") {
      return item;
    } else if (item.Ac.toLowerCase().includes(query.toLowerCase())) {
     
      return item;
    }
  })

  const handledelete = (Ac) => {

    const updatedDatabase = data.filter(record => record.Ac !== Ac);

    update(updatedDatabase);
  }
  const navigateToUpdate = (Ac) => {
    navigate('/Update', { state: Ac });
  }

  let num = 1;
  return (
    <div>
      <div className='customer-page'>
        <nav className='nav'>
          <img src={logo} alt='logo' width={100} height={100} />
          <label id='search'>Search Account Number : <input placeholder='search' onChange={e => setQuery(e.target.value)} /></label>
          <CgProfile style={{"marginLeft":"10px","fontSize":"18px"}} name={username} /><a style={{"fontSize":"23px"}} >{username}</a>

          <NavLink className="menu logout" style={{"marginLeft":"120px"}} to={"/"}>Log out</NavLink>
        </nav>

        <div className='list-customer'>
          <h1 className='h1'>List of Customers</h1>
          <table className='table'>
            <tr className='table1'>
              <th>S.No</th>
              <th>Name</th>
              <th>ID</th>
              <th>AC</th>
              <th>Actions</th>
            </tr>
            {data.map((item, key) => {
              return (
                <tr key={key} className='table1'>
                  <td>{num++}.</td>
                  <td>{item.Customer_name}</td>
                  <td>{item.ID}</td>
                  <td >{item.Ac}</td>
                  <td>
                    <VscEye className='icon' onClick={() => { navigate("/Details", { state: { data: item } }) }} /> &ensp;
                    <VscEdit className='icon' onClick={() => navigateToUpdate(item.Ac)} />&ensp;
                    <VscTrash className='icon' onClick={() => handledelete(item.Ac)} />&ensp;
                    <VscHistory className='icon' onClick={() => { navigate("/Transactions", { state: {Ac:item.Ac } } ) }}/>

                  </td>
                </tr>
              )
            })}
          </table>
        </div>
      </div>
    </div>
  )
};

export default Access2;