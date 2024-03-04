import React, {useState, useEffect } from 'react'
import { NavLink, useLocation, } from 'react-router-dom'
import logo from './DIT BANK.png'

const Detail = () => {

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (!selectedCustomer) {
            setSelectedCustomer(location.state.data);
        }
    }, [location.state.data, selectedCustomer]);

    let num=1;
    return (
        <div>
            <nav className='nav'>
                <img src={logo} alt='logo' width={100} height={100} />
            
                <NavLink className="back menu" to={-1}>Home</NavLink>

            </nav>
            <div className='details' style={{"marginTop":"120px"}}>
                <div className='details-list'>
                    <h2 className='details-h2'>Customer Details </h2>
                    <div  >

                        {selectedCustomer && (
                            <ul>
                                <li><a>Name      :</a> {selectedCustomer.Customer_name}</li>
                                <li><a>Account   :</a>{selectedCustomer.Ac}</li>
                                <li><a>Username  :</a> {selectedCustomer.username}</li>
                                <li><a>ID        :</a> {selectedCustomer.ID}</li>
                                <li><a>Password  :</a> {selectedCustomer.password}</li>
                                {/* <li><a>Confirm Password :</a> {selectedCustomer.re_password}</li> */}
                                <li><a>Phone     : </a>{selectedCustomer.phone}</li>
                                <li><a>Aadhar No :</a> {selectedCustomer.adno}</li>
                                <li><a>Address   :</a> {selectedCustomer.address}</li>
                                <li><a>Balance   :</a> {selectedCustomer.amount}</li>
                            </ul>
                        )}
                        {selectedCustomer && selectedCustomer.files && (
                        <ul>
                            <h3>Uploaded Files:</h3>
                            {selectedCustomer.files.map((file, index) => (
                            <li>{num++} . {file.name}</li>
                            ))}
                        </ul>
                        )}                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Detail;