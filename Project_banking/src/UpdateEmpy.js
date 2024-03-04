import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from './MyContextProvider';
import logo from './DIT BANK.png'

const UpdateEmpy = () => {
    const navigate = useNavigate()
    const { employeeList, updataEmp  } = useContext(MyContext);
    const [change, setChange] = useState({});
    const location = useLocation();
    const Employee_ID = location.state;

    useEffect(() => {
        const foundRecord = employeeList.find(record => record.Employee_ID === Employee_ID);
        setChange(foundRecord);
    }, [Employee_ID]);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setChange(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = change;

        const index = employeeList.findIndex(record => record.Employee_ID === Employee_ID);


        if (index !== -1) {
            employeeList[index] = updatedData;
        }

        alert("Successfully Update Employee details !!!")
        navigate(-1);
    };
    return (
        <div>
            <nav className='nav'>
                <img src={logo} alt='logo' width={100} height={100} />
                <NavLink className="back menu " to={-1}>Home</NavLink>

            </nav>
            <form onSubmit={handleSubmit} className="form">
                <h2 className='form-h2'>Employee Registration Form</h2>
                <label>
                    Employee Name :
                    <input
                        type="text"
                        name="Employee_name"
                        className="input"

                        value={change.Employee_name}
                        onChange={handlechange}
                        required
                    />

                </label><br></br>
                <label>
                    Employee Password :
                    <input
                        type="password"
                        name="Employee_password"
                        className="input"

                        value={change.Employee_password}
                        onChange={handlechange}
                        required
                    />

                </label><br></br>
                <label>
                    Employee ID :
                    <input
                        type="text"
                        name="Employee_ID"
                        className="input"
                        readOnly
                        value={change.Employee_ID}
                        onChange={handlechange}
                        required
                    />
                </label><br></br>
                <label>
                    Employee Address :
                    <input
                        type="text"
                        name="Employee_Address"
                        className="input"

                        value={change.Employee_Address}
                        onChange={handlechange}
                        required
                    />
                </label><br></br>
                <label>
                    Employee Designation:
                    <select
                        // type="text"
                        name="Employee_designations"
                        className="input"

                        value={change.Employee_designations}
                        onChange={handlechange}
                        required
                    >
                        <option value="">Select</option>
                        <option>Customer Services</option>
                        <option>Cashier</option>
                        <option>Accountant</option>
                        <option>Manager</option>
                    </select>
                </label><br></br>
                <label>
                    Employee_Access_leval:</label>
                <select
                    name="Employee_Access_leval"
                    className="input"
                    value={change.Employee_Access_leval}
                    onChange={handlechange}
                    required
                >
                    <option value="">Select</option>
                    
                    <option> 1 </option>
                    <option> 2 </option>
                    <option> 3 </option>
                </select>&emsp;
                <br></br>
                <input type="submit" value="Update" id='button'></input>
            </form>
        </div>
    )
}

export default UpdateEmpy;