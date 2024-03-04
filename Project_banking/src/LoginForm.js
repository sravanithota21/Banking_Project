import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from './MyContextProvider';
// import './Style.scss';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { employeeList ,myData} = useContext(MyContext);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const adminCredentials = { username: 'admin', password: 'admin@123' };
    const employeeCredentials = { username: 'employee', password: 'employee@123' };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      alert("successfully Login Admin!!!");
      navigate('/AdminPage',{state:{username:username}});
    } else if (username === employeeCredentials.username && password === employeeCredentials.password) {

      alert("successfully Login Employee!!!");
      navigate("/CustomerDetails",{state:{username:username}});
    } else 

    if (employeeList.find(item => item.Employee_name === username && item.Employee_password === password)) {
      const user = employeeList.find(item => item.Employee_name === username && item.Employee_password === password);
    
      if (parseInt(user.Employee_Access_leval) === 1) {
        alert("Successfully Login Employee1!!!");
        navigate('/CustomerDetails',{state:{username:username}});
      } else if (parseInt(user.Employee_Access_leval) === 2) {
        alert("Successfully Login Employee2!!!");
        navigate('/Access2',{state:{username:username}});
      } else if (parseInt(user.Employee_Access_leval ) === 3) {
        alert("Successfully Login Employee3!!!");
        navigate('/Access3',{state:{username:username}});
      }
    } 
    else 
    if (myData.find(item => item.username === username && item.password === password)){
      const user=myData.find(item => item.username === username && item.password === password);
      navigate("/Customer",{state:{data:user}})
    }
    
    else {
      alert('Invalid username or password');
    }
    
    
  };

  return (
    <div className='background'>
      <div id="login-form">
        <h1 className='login-h1'>Login</h1>
        <form id='login'>
          <label htmlFor="username">Username:</label>
          <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />

          <label htmlFor="password">Password:</label>
          <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <button id='btn' onClick={handleSubmit}>Submit</button>
        </form>

      </div>
    </div>
  );
};

export default LoginForm;


// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MyContext } from './MyContextProvider';
// // import './Style.scss';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const { employeeList} = useContext(MyContext);

//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     const adminCredentials = { username: 'admin', password: 'admin@123' };
//     const employeeCredentials = { username: 'employee', password: 'employee@123' };

//     if (username === adminCredentials.username && password === adminCredentials.password) {
//       alert("successfully Login Admin!!!");
//       navigate('/AdminPage',{state:{username:username}});
//     } else if (username === employeeCredentials.username && password === employeeCredentials.password) {

//       alert("successfully Login Employee!!!");
//       navigate("/CustomerDetails",{state:{username:username}});
//     } else 

//     if (employeeList.find(item => item.Employee_name === username && item.Employee_password === password)) {
//       const user = employeeList.find(item => item.Employee_name === username && item.Employee_password === password);
    
//       if (parseInt(user.Employee_Access_leval) === 1) {
//         alert("Successfully Login Employee1!!!");
//         navigate('/CustomerDetails',{state:{username:username}});
//       } else if (parseInt(user.Employee_Access_leval) === 2) {
//         alert("Successfully Login Employee2!!!");
//         navigate('/Access2',{state:{username:username}});
//       } else if (parseInt(user.Employee_Access_leval ) === 3) {
//         alert("Successfully Login Employee3!!!");
//         navigate('/Access3',{state:{username:username}});
//       }
//     } else {
//       alert('Invalid username or password');
//     }

//   };

//   return (

//     // <div class="container" onclick="onclick">
//     //   <div class="top"></div>
//     //   <div class="bottom"></div>
//     //   <div class="center">
//     //     <p>Please Sign In</p>
//     //     <input type="text" placeholder="email" value={username} onChange={(e) => setUsername(e.target.value)}/>
//     //     <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//     //     <button id='btn' onClick={handleSubmit}>Submit</button>
//     //     <h2>&nbsp;</h2>
//     //   </div>
//     // </div>
//     <div className='background'>
//     <div id="login-form">
//       <h1 className='login-h1'>Login</h1>
//       <form id='login'>
//         <label htmlFor="username">Username:</label>
//         <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />

//         <label htmlFor="password">Password:</label>
//         <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />

//         <button id='btn' onClick={handleSubmit}>Submit</button>
//       </form>

//     </div>
//     </div>
//   );
// };

// export default LoginForm;






// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     const adminCredentials = { username: 'admin', password: 'admin123' };
//     const employeeCredentials = { username: 'employee', password: 'employee123' };

//     if (username === adminCredentials.username && password === adminCredentials.password) {

//       navigate('/AdminPage');
//     } else if (username === employeeCredentials.username && password === employeeCredentials.password) {

//       // navigate('/EmployeePage');
//       navigate("/CustomerDetails");
//     } else {
//       alert('Invalid username or password');
//     }
//   };

//   return (
//     <div id="login-form">
//       <h1>Login</h1>
//       <form id='login'>
//         <label htmlFor="username">Username:</label>
//         <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />

//         <label htmlFor="password">Password:</label>
//         <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />

//         <button id='btn' onClick={handleSubmit}>Submit</button>
//       </form>

//     </div>
//   );
// };

// export default LoginForm;