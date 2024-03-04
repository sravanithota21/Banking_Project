import React, { useContext, useState } from 'react';
import { MyContext } from './MyContextProvider';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
import { VscEye, VscEdit, VscTrash, VscHistory } from "react-icons/vsc";

import { CgProfile } from "react-icons/cg";
import logo from './DIT BANK.png'
const CustomerDetails = () => {
  const { update, myData, employeeList } = useContext(MyContext);
  const [query, setQuery] = useState("");
  // const account = randomNumberInRange(334466, 999999);
  // const id = makeid(6);
  let navigate = useNavigate();

  const location = useLocation()

  const { username } = location.state;
  console.log(username);
  const name=username;

  // function makeid(length) {
  //   let result = '';
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  //   const charactersLength = characters.length;
  //   let counter = 0;
  //   while (counter < length) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //     counter += 1;
  //   }
  //   return result;
  // }

  // function randomNumberInRange(min, max) {

  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }


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

  const viewprofile = () => {
    const view = employeeList.filter(item => {
      if (item.Employee_name === username) {
        return item;
      }
    })
    // Swal.fire({
    
      
    //   imageUrl: "https://placeholder.pics/svg/300x1500",
    //   imageHeight: 500,
    //   imageWidth:5000,
    //   imageAlt: "A tall image"
    // });
    {
      view.map(item => {
        return(
        <ul>
          <li>{item.Employee_name}</li>
          <li>{item.Employee_ID}</li>
          <li>{item.Employee_Address}</li>
          <li>{item.Employee_designations}</li>
          <li>{item.Employee_Access_leval}</li>
        </ul>
      )})
    }
    console.log(view);
  }

  let num = 1;
  return (
    <div>
      <div className='customer-page'>
        <nav className='nav'>
          <img src={logo} alt='logo' width={100} height={100} />
          <label id='search'>Search Account Number : <input placeholder='search' onChange={e => setQuery(e.target.value)} /></label>
          {/* <NavLink className="menu addcustomer" to={"/AddCustomer"} style={{ "marginLeft": "30px" }} state={{ account: account, id: id }} >Add Customer</NavLink> */}
          <NavLink className="menu " to={"/AddCustomer"} style={{ "marginLeft": "30px" }}>Add Customer</NavLink>

          <CgProfile style={{"marginLeft":"10px","fontSize":"18px"}} name={username} /><a style={{"fontSize":"23px"}} onClick={viewprofile}>{username}</a>
          {/* <CgProfile style={{"marginLeft":"10px"}} onClick={() => viewprofile()} />{username} */}
          
          <NavLink className="menu logout" style={{"marginLeft":"10px"}} to={"/"}>Log out</NavLink>
        </nav>

        <div className='adminpage'>
          <h1 className='h1'>List of Customers</h1>
          <table>
            <tr>
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
                    <VscHistory className='icon' onClick={() => { navigate("/Transactions", { state: { Ac: item.Ac } }) }} />
                  </td>
                </tr>
              )
            })}
          </table>
          {/* {view && view.map(item => {
            <ul>
              <li>{item.Employee_name}</li>
              <li>{item.Employee_ID}</li>
              <li>{item.Employee_Address}</li>
              <li>{item.Employee_designations}</li>
              <li>{item.Employee_Access_leval}</li>
            </ul>
          })} */}
        </div>
      </div>
    </div>
  )
};

export default CustomerDetails;