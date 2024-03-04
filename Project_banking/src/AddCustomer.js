import React, { useContext, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from './MyContextProvider';
import logo from './DIT BANK.png'
import { getID,getAccount,incrementID,incrementAccount } from './counter';
const AddCustomer = () => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState({ username: '', password: '', re_password: '' });
  const [account, setAccount] = useState(334465);
  const [id, setID] = useState(131);

  const { myData, TransactionsAry } = useContext(MyContext);
  let navigate = useNavigate();

  // const incrementAccount = () => {
  //   setAccount(prevAccount => prevAccount + 1);
  // };

  // const getAccount = () => {
  //   return account;
  // };

  // const incrementID = () => {
  //   setID(prevID => prevID + 1);
  // };

  // const getID = () => {
  //   return id;
  // };

  const handlechange = e => {
    const name = e.target.name;
    const value = e.target.value;

    // Update the inputs object with the new values
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value,
      Ac: getAccount(), // Update account value
      ID: "DIT" + getID() // Update ID value
    }));

    // Validate the inputs
    validateInputs(e);
  };

  const validateInputs = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: '' };
      switch (name) {
        case 'username':
          if (!value) {
            stateObj[name] = 'Please enter Username.';
          }
          break;
 
      case "password":
        if (!value) {
          stateObj[name] = "Please enter Password.";
        } else if (inputs.re_password && value !== inputs.re_password) {
          stateObj["re_password"] = "Password and Confirm Password does not match.";
        } else {
          stateObj["re_password"] = inputs.re_password ? "" : error.re_password;
        }
        break;
 
      case "re_password":
        if (!value) {
          stateObj[name] = "Please enter Confirm Password.";
        } else if (inputs.password && value !== inputs.password) {
          stateObj[name] = "Password and Confirm Password does not match.";
        }
        break;
 
      default:
        break;
    }
 
    return stateObj;
  });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    myData.push(inputs);

    const transactionDetails = {
      Ac: inputs.Ac,

      transactionDate: new Date(),
      transactionAmount: inputs.amount,
      transactionType: 'Credit',
    }
    TransactionsAry.push(transactionDetails);
    alert("successfully created Customer !");
    setInputs("");
    incrementAccount();
    incrementID();
    navigate(-1);

  }
  return (
    <div>
      <div className='customer-page'>
        <nav className='nav'>
          <img src={logo} alt='logo' width={100} height={100} />
          <NavLink className="back menu " to={-1}>Home</NavLink>

        </nav>
        <form onSubmit={handleSubmit} className="form">
          <h2 className='form-h2'>Customer Registration Form</h2>
          <label>
            Customer Name :
            <input
              type="text"
              name="Customer_name"
              className="input"

              value={inputs.Customer_name}
              onChange={handlechange}
              required
            />

          </label><br></br>
          <label>
            Username:
            <input
              type="email"
              name="username"
              className="input"

              value={inputs.username}
              onChange={handlechange}
              onBlur={validateInputs}
              required
            />
            {error.username && <span className='error'>{error.username}</span>}

          </label><br></br>
          <label>
            Password:
            <input
              type="password"
              name="password"
              className="input"
              minLength={8}
              value={inputs.password}
              onChange={handlechange}
              onBlur={validateInputs}
              required
            />
            {error.password && <span className='error'>{error.password}</span>}
          </label><br></br>
          <label>
            Confirm Password:
            <input
              type="password"
              name="re_password"
              className="input"
              minLength={8}
              value={inputs.re_password}
              onChange={handlechange}
              onBlur={validateInputs}
              required
            />
            {error.re_password && <span className='error'>{error.re_password}</span>}
          </label><br></br>

          <label>
            Customer ID :
            <input
              type="text"
              name="ID"
              className="input"
              readOnly
              value={"DIT" + getID()}
              onChange={handlechange}
              required
            />
          </label><br></br>

          <label>
            Account No:
            <input
              type="number"
              name="ac"
              readOnly
              className="input"

              value={getAccount()}
              onChange={handlechange}
              required
            />
          </label><br></br>
          <label>
            Phone No:
            <input
              type="number"
              name="phone"
              className="input"
              minLength={10}
              value={inputs.phone}
              onChange={handlechange}
              required
            />
          </label><br></br>
          <label>
            Aadhar number:
            <input
              type="number"
              name="adno"
              minLength={12}
              className="input"
              value={inputs.adno}
              onChange={handlechange}
              required
            />
          </label><br></br>
          <label>
            Address :
            <input
              type="address"
              name="address"
              className="input"
              value={inputs.address}
              onChange={handlechange}
              required
            />
          </label><br></br>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              min={1000}
              className="input"
              value={inputs.amount}

              onChange={handlechange}
              required

            />
          </label><br></br>
          <input type="submit" value="Submit" id='button'></input>

        </form>
      </div>
    </div>
  )
}

export default AddCustomer;