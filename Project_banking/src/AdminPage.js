// src/pages/AdminPage.js
import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from './MyContextProvider';
import logo from './DIT BANK.png'
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';

const AdminPage = () => {
  const location = useLocation()

  const { username } = location.state;
  let navigate = useNavigate();
  const { employeeList, updataEmp } = useContext(MyContext);
  const id = makeid(6);
 
  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const handledelete = (Employee_ID) => {
    const updatedDatabase = employeeList.filter(record => record.Employee_ID !== Employee_ID);

    updataEmp(updatedDatabase);
  }

  const navigateToUpdate = (Employee_ID) => {
    navigate('/UpdateEmpy', { state: Employee_ID });
  }
  var num = 1;
  return (
    <div>
      <nav className='nav'>
        <img src={logo} alt='logo' width={100} height={100} />
        <NavLink className="menu " style={{ "marginLeft": "65%" }} to={"/AddEmployee"} state={{ id: id }}>Add Employee</NavLink>
        <CgProfile style={{"marginLeft":"20px","fontSize":"18px"}} name={username} /><a style={{"fontSize":"23px"}} >{username}</a>

        <NavLink className="menu " style={{ "marginLeft": "60px" ,"fontSize":"21px"}} to={"/"}>Log out</NavLink>

      </nav>
      <div className='adminpage'>
        <h1 className='h1'>List of Employee's</h1>
        <table style={{"padding":"40px"}}>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Password</th>
            <th>ID</th>
            <th>Address</th>
            <th>Designations</th>
            <th>Access Leval</th>
            <th>Actions</th>
          </tr>

          {employeeList && employeeList.map((item, key) => (
            <tr key={key} className='table1' >
              <td>{num++}.</td>
              <td>{item.Employee_name}</td>
              <td>{item.Employee_password}</td>
              <td>{item.Employee_ID}</td>
              <td>{item.Employee_Address}</td>
              <td>{item.Employee_designations}</td>
              <td>{item.Employee_Access_leval}</td>
              <td>
                <VscTrash className='icon' onClick={() => handledelete(item.Employee_ID)} /> &ensp;
                <VscEdit className='icon' onClick={() => navigateToUpdate(item.Employee_ID)} />
              </td>
            </tr>

          ))}
        </table>
      </div>
    </div>
  );
};

export default AdminPage;