import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from './MyContextProvider';
import logo from './DIT BANK.png'
import { ToastContainer } from 'react-toastify';


const Update = () => {
    const navigate = useNavigate()
    const { name, update, myData } = useContext(MyContext);
    const [change, setChange] = useState({});
    const location = useLocation();
    const Ac = location.state;

    useEffect(() => {
        const foundRecord = myData.find(record => record.Ac === Ac);
        setChange(foundRecord);
    }, [Ac]);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setChange(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = change;

        const index = myData.findIndex(record => record.Ac === Ac);


        if (index !== -1) {
            myData[index] = updatedData;
        }

        alert("successfully Update Customer details !!!")
        navigate(-1)
    };
    return (
        <div>
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

                        value={change.Customer_name}
                        onChange={handlechange}
                        required
                    />

                </label><br></br>

                <label>
                    Customer ID :
                    <input
                        type="text"
                        name="ID"
                        className="input"
                        readOnly
                        value={change.ID}
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
                        readOnly
                        value={change.username}
                        onChange={handlechange}

                        required
                    />


                </label><br></br>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        className="input"
                        minLength={8}
                        // readOnly
                        value={change.password}
                        onChange={handlechange}

                        required
                    />

                </label><br></br>
                

                <label>
                    Account No:
                    <input
                        type="number"
                        readOnly
                        name="Ac"
                        className="input"
                        // value="initial value"
                        value={change.Ac}
                        // onChange={handlechange}
                        required
                    />
                </label><br></br>
                <label>
                    Phone No:
                    <input
                        type="number"
                        name="phone"
                        className="input"

                        value={change.phone}
                        onChange={handlechange}
                        required
                    />

                </label><br></br>
                <label>
                    Aadhar number:
                    <input
                        type="number"
                        name="adno"
                        readOnly
                        className="input"
                        value={change.adno}
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

                        value={change.address}
                        onChange={handlechange}
                        required
                    />
                </label><br></br>
                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        readOnly
                        className="input"
                        value={change.amount}
                        // onChange={handlechange}
                        required
                    />
                </label><br></br>
                <input type="submit" value="Update" id='button'></input>
                {/* <ToastContainer /> */}
            </form>
        </div>
    )
}

export default Update;