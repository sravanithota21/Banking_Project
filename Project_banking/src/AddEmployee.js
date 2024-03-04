import React, { useContext, useState } from 'react'
import { MyContext } from './MyContextProvider';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from './DIT BANK.png'
import { getEmp_id, incrementEmp_id } from './counter';

const AddEmployee = () => {
    const [inputs, setInputs] = useState({});
    let navigate = useNavigate();
    const { employeeList} = useContext(MyContext);
    // const location = useLocation()

    // const {id}=location.state;
    // const ID=id;

    // const id=makeid(6);
    // function randomNumberInRange(min, max) {
  
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
    // function makeid(length) {
    //     let result = '';
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    //     const charactersLength = characters.length;
    //     let counter = 0;
    //     while (counter < length) {
    //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //       counter += 1;
    //     }
    //     return result;
    // }

    
    // let emp_id=107;
    // function incrementEmp_id() {
    //     emp_id++;
    //   }
      
    // function getEmp_id() {
    //     return emp_id;
    //   }

    const handlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        inputs.Employee_ID="DIT-A"+getEmp_id();
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        employeeList.push(inputs);
        console.log(inputs);
        alert("successfully created Employee !");
        incrementEmp_id();
        navigate(-1);
    }
    
    return (
        <div>
            <nav className='nav'>
                <img src={logo} alt='logo' width={100} height={100} />
                <NavLink className="menu back " to={-1}>Home</NavLink>

            </nav>
  
            <form onSubmit={handleSubmit} className="form">
                <h2 className='form-h2'>Employee Registration Form</h2>
                <label>
                    Employee Name :
                    <input
                        type="text"
                        name="Employee_name"
                        className="input"

                        value={inputs.Employee_name}
                        onChange={handlechange}
                        required
                    />

                </label><br></br>
                <label>
                    Password :
                    <input
                        type="password"
                        name="Employee_password"
                        className="input"
                        // rules={["capital", "match", "specialChar", "minLength", "number"]}
                        minLength={8}
                        
                        value={inputs.Employee_password}
                        onChange={handlechange}
                        required
                    />

                </label><br></br>
                <label>
                    Employee ID :
                    <input
                        type="text"
                        name="ID"
                        className="input"

                        value={"DIT-A"+getEmp_id()}
                        onChange={handlechange}
                        required
                    />
                </label><br></br>
                <label>
                    Address :
                    <input
                        type="text"
                        name="Employee_Address"
                        className="input"

                        value={inputs.Employee_Address}
                        onChange={handlechange}
                        required
                    />
                </label><br></br>
                <label>
                    Designation:
                    <select
                        // type="text"
                        name="Employee_designations"
                        className="input"

                        value={inputs.Employee_designations}
                        onChange={handlechange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Customer Services">Customer Services</option>
                        <option value="Cashier">Cashier</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Manager">Manager</option>
                    </select>
                </label><br></br>
                <label>
                    Access leval:</label>
                    <select
                        name="Employee_Access_leval"
                        className="input"
                        value={inputs.Employee_Access_leval}
                        onChange={handlechange}
                        required
                    >
                        <option value="">Select</option>
                        <option> 1 </option>
                        <option> 2 </option>
                        <option> 3 </option>
                    </select>&emsp;
                <br></br>
                <input type="submit" value="Submit" id='button'></input>
            </form>

        </div >
    )
}

export default AddEmployee;