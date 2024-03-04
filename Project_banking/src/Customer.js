import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from './MyContextProvider';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import logo from './DIT BANK.png';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { VscEye, VscTrash } from 'react-icons/vsc';
import Modal from 'react-modal';
import ModalComponent from './ModalComponent';

const Customer = () => {

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const location = useLocation();
    const [showForm, setShowForm] = useState(false);
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState({ oldpassword: "", newpassword: "", confirmpassword: "" });
    const { myData, update } = useContext(MyContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    let num = 1;
    console.log("newdata", location.state.data)
    // useEffect(() => {
    //     if (location.state && location.state.updatedData) {
    //         console.log("Updated Data:", location.state.updatedData);
    //         setUpdatedData(location.state.updatedData);
    //     }
    // }, [location.state]);
    let navigate = useNavigate();
    const handleUploadFiles = async () => {
        // navigate("/UploadFile",{ state: { account: selectedCustomer.Ac } })
        navigate("/UploadFile", { state: { data: selectedCustomer } })
        console.log(selectedCustomer);
    };
    useEffect(() => {
        if (location.state && location.state.data) {
            setSelectedCustomer(location.state.data);
        }
        if (location.state && location.state.updatedData) {
            const accountNumber = location.state.account;
            const updatedData = location.state.updatedData;
            const selected = updatedData.find(obj => obj.Ac === accountNumber);
            setSelectedCustomer(selected);
        }
    }, [location.state]);



    // useEffect(() => {
    //     // console.log("Location state:", location.state);
    //     if (location.state && location.state.data) {
    //         // console.log("Selected customer data:", location.state.data);
    //         setSelectedCustomer(location.state.data);
    //     } else {
    //         console.error("No customer data found in location state");
    //     }
    // }, [location.state]);


    const handlePassword = () => {
        setShowForm(current => !current);
    };

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        validateInputs(e);
    };

    const validateInputs = (e) => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };
            switch (name) {
                case "oldpassword":
                    if (!value) {
                        stateObj[name] = "Please enter old password.";
                    } else if (inputs.oldpassword && myData.find(item => item.password !== inputs.oldpassword)) {
                        stateObj["oldpassword"] = "Please enter correct password.";

                    }
                    break;

                case "newpassword":
                    if (!value) {
                        stateObj[name] = "Please enter new password.";
                    } else if (inputs.confirmpassword && value !== inputs.confirmpassword) {
                        stateObj["confirmpassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmpassword"] = inputs.confirmpassword ? "" : error.confirmpassword;
                    }
                    break;

                case "confirmpassword":
                    if (!value) {
                        stateObj[name] = "Please enter confirm password.";
                    } else if (inputs.newpassword && value !== inputs.newpassword) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;

                default:
                    break;
            }
            console.log(stateObj);
            return stateObj;
        });
    };

    const updatePassword = (e) => {
        e.preventDefault();
        const { oldpassword, newpassword, confirmpassword } = inputs;

        if (!oldpassword) {
            toast.error("Please enter your old password.");
            return;
        }

        const customer = myData.find(item => item.Ac === selectedCustomer.Ac);

        if (selectedCustomer.password !== oldpassword) {
            toast.error("Please enter your old password correctly.");
            return;
        }

        if (!newpassword || !confirmpassword) {
            toast.error("Please enter your new password and confirm password.");
            return;
        }

        if (newpassword !== confirmpassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        // Update the password in the state
        const newState = myData.map((obj) => {
            if (obj.Ac === selectedCustomer.Ac) {
                return { ...obj, password: newpassword };
            }
            return obj;
        });

        // Update the context state
        update(newState);

        // Update the selected customer's password
        setSelectedCustomer({ ...selectedCustomer, password: newpassword });

        // Reset form inputs and close the form
        setInputs({});
        setShowForm(false);

        alert("Password updated successfully!");
    };
    const openModal = (file) => {
        setSelectedFile(file);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedFile(null);
        setModalIsOpen(false);
    };
    const handleFileDelete = (index) => {
        const newFiles = selectedCustomer.files.filter((file, i) => i !== index);
        const updatedCustomer = { ...selectedCustomer, files: newFiles };
        setSelectedCustomer(updatedCustomer);
        update(myData.map(obj => obj.Ac === updatedCustomer.Ac ? updatedCustomer : obj));
    };


    return (
        <div className=''>
            <nav className='nav'>
                <img src={logo} alt='logo' width={100} height={100} />
                <NavLink className="menu logout" style={{ "marginLeft": "80%" }} to={"/"}>Log out</NavLink>
            </nav>
            <div className='details ' style={{ "marginTop": "120px" }}>
                <div className='details-list'>
                    <h2 className='details-h2'>Customer Details </h2>


                    <div>
                        {selectedCustomer && (
                            <ul>
                                <li><a>Name:</a> {selectedCustomer.Customer_name}</li>
                                <li><a>Account:</a> {selectedCustomer.Ac}</li>
                                <li><a>Username:</a> {selectedCustomer.username}</li>
                                <li><a>ID:</a> {selectedCustomer.ID}</li>
                                <li><a>Password:</a> {selectedCustomer.password}</li>
                                <li><a>Phone:</a> {selectedCustomer.phone}</li>
                                <li><a>Aadhar No:</a> {selectedCustomer.adno}</li>
                                <li><a>Address:</a> {selectedCustomer.address}</li>
                                <li><a>Balance:</a> {selectedCustomer.amount}</li>
                            </ul>
                        )}
                        <button onClick={handlePassword} className='btn-modal'>Change password</button><br></br><br></br>
                        <button onClick={handleUploadFiles}>Upload Files</button><br></br>
                        <ModalComponent isOpen={modalIsOpen} closeModal={closeModal} selectedFile={selectedFile} />

                    </div>



                    {showForm && (
                        <div className='modal'>
                            <div onClick={handlePassword} className="overlay"></div>
                            <form className='modal-content ' >
                                <div style={{ "marginTop": "40px" }}>
                                    <label>
                                        Old Password:
                                        <input
                                            type="password"
                                            name="oldpassword"
                                            className="input"
                                            value={inputs.oldpassword}
                                            onChange={handlechange}
                                            onBlur={validateInputs}
                                            required
                                        />
                                        {error.oldpassword && <span className='error'>{error.oldpassword}</span>}
                                    </label><br></br>

                                    <label >
                                        New Password:
                                        <input
                                            type="password"
                                            name="newpassword"
                                            className="input"
                                            minLength={8}
                                            value={inputs.newpassword}
                                            onChange={handlechange}
                                            onBlur={validateInputs}
                                            required
                                        />
                                        {error.newpassword && <span className='error'>{error.newpassword}</span>}
                                    </label><br></br>
                                    <label>
                                        Confirm Password:
                                        <input
                                            type="password"
                                            name="confirmpassword"
                                            className="input"
                                            minLength={8}
                                            value={inputs.confirmpassword}
                                            onChange={handlechange}
                                            onBlur={validateInputs}
                                            required
                                        />
                                        {error.confirmpassword && <span className='error'>{error.confirmpassword}</span>}
                                    </label><br></br>
                                </div>
                                <button className=' depositbtn' style={{ "marginLeft": "250px", textAlign: "center" }} onClick={updatePassword}>Update</button>
                                <button className="close-modal" onClick={handlePassword}>X</button>
                                <ToastContainer />
                            </form>
                        </div>
                    )}
                </div>
            </div>
            {selectedCustomer && selectedCustomer.files && selectedCustomer.files.length > 0 ? (
                <div style={{margin:"100px",marginLeft:"20%"}}>
                    <h3>Uploaded Files:</h3>
                    <table style={{ "marginLeft": "27px" }}>
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>File Type</th>
                                <th>File Size</th>
                                <th>Pages</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCustomer.files.map((file, index) => (
                                <tr key={index}>
                                    <td>{file.name.split('.').slice(0, -1).join('.')}</td>
                                    <td>{file.type.split('/')[1]}</td>
                                    {/* <td>{formatBytes(file.size)}</td> */}
                                    <td>{(file.size / (1024 * 1024)).toFixed(2)} MB</td>
                                    <td>{file.pages}</td>
                                    <td>
                                        <VscEye onClick={() => openModal(file)} />
                                        {/* <VscTrash onClick={() => handleFileDelete(index)} /> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No files uploaded.</p>
            )}
        </div>
    );
};

export default Customer;