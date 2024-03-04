// import React, { useContext, useState } from 'react'
// import { MyContext } from './MyContextProvider';
// import { useNavigate } from 'react-router-dom';

// const WithDraw = () => {
//     const { name, update, myData } = useContext(MyContext);
//     const [withdrawData, setWithdrawData] = useState("");

//     let navigate = useNavigate();

//     const handlechange = (event) => {
//       const name = event.target.name;
//       const value = event.target.value;
//       setWithdrawData(values => ({ ...values, [name]: value }))
//       // update(depositData);
//     }
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       // setDepositData(name);
//       // update(withdrawData);
//       console.log(withdrawData);
//       navigate("/CustomerDetails");
//     }
//   return (
//     <div>
//       <form className='login-form'>
//         <lable>Account Number</lable>
//         <input type='number' name='Ac' value={withdrawData.Ac || ""} onChange={handlechange} />
//         <label>Amount</label>
//         <input type='number' name='amount' value={withdrawData.amount || ""} onChange={handlechange} />
//         <button onSubmit={handleSubmit}>WithDraw amount</button>
//       </form>
//     </div>
//   )

//   }
// export default WithDraw;