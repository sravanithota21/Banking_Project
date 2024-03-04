import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from './MyContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import logo from './DIT BANK.png';
import { VscEye } from 'react-icons/vsc';
import ModalComponent from './ModalComponent';

const Details = () => {
  const { update, myData, TransactionsAry } = useContext(MyContext);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const location = useLocation();
  const [money, setMoney] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (!selectedCustomer) {
      setSelectedCustomer(location.state.data);
    }
  }, [location.state.data, selectedCustomer]);

  const handleDeposit = (e) => {
    e.preventDefault();
    const value = parseFloat(money);

    if (!isNaN(value)) {
      const newState = myData.map((obj) => {
        if (obj.Ac === selectedCustomer.Ac) {
          const transactionDetails = {
            Ac: selectedCustomer.Ac,
            transactionDate: new Date(),
            transactionAmount: value,
            transactionType: 'Credit',
          }
          TransactionsAry.push(transactionDetails);
          return { ...obj, amount: parseFloat(obj.amount) + value };
        }
        return obj;
      });

      update(newState);

      setMoney("");
      setSelectedCustomer({ ...selectedCustomer, amount: parseFloat(selectedCustomer.amount) + value });

      toast.success("Amount Deposited Successfully!!!");
    } else {
      alert("Please Enter Your Amount");
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const value = parseFloat(money);

    if (!isNaN(value) && selectedCustomer.amount >= value) {
      const newState = myData.map((obj) => {
        if (obj.Ac === selectedCustomer.Ac) {
          const transactionDetails = {
            Ac: obj.Ac,
            transactionDate: new Date(),
            transactionAmount: value,
            transactionType: 'Debit',
          };
          TransactionsAry.push(transactionDetails);

          return { ...obj, amount: parseFloat(obj.amount) - value };
        }
        return obj;
      });
      update(newState);

      setMoney("");
      setSelectedCustomer({ ...selectedCustomer, amount: parseFloat(selectedCustomer.amount) - value });

      toast.success("Amount Withdrawn Successfully!!!");
    } else {
      alert("Insufficient balance or Please Enter Your Amount");
    }
  };

  const openModal = (file) => {
    setSelectedFile(file);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedFile(null);
    setModalIsOpen(false);
  };
  let num = 1;


  return (
    <div>
      <nav className='nav'>
        <img src={logo} alt='logo' width={100} height={100} />
        <NavLink className="back menu " to={-1}>
          Home
        </NavLink>
      </nav>

      <div className='details'>
        <div className='details-list'>
          <h2 className='details-h2'>Customer Details </h2>
          <div>
            {selectedCustomer && (
              <ul>
                <li><a>Name      :</a> {selectedCustomer.Customer_name}</li>
                <li><a>Account   :</a>{selectedCustomer.Ac}</li>
                <li><a>Username  :</a> {selectedCustomer.username}</li>
                <li><a>ID        :</a> {selectedCustomer.ID}</li>
                <li><a>Password  :</a> {selectedCustomer.password}</li>
                {/* <li><a>Confirm Password :</a> {selectedCustomer.re_password}</li> */}
                <li><a>Phone     :</a> {selectedCustomer.phone}</li>
                <li><a>Aadhar No :</a> {selectedCustomer.adno}</li>
                <li><a>Address   :</a> {selectedCustomer.address}</li>

                <li><a>Balance   :</a> {selectedCustomer.amount}</li>
              </ul>
            )}

          </div>
          <div>
            <form className='money-form'>
              <label>Enter Amount</label>
              <input
                type='number'
                min={0}
                value={parseFloat(money)}
                onChange={(e) => setMoney(e.target.value)}
                required
              />

              <div>
                <button className='depositbtn' onClick={handleDeposit}>
                  Deposit
                </button>
                <button className='withdrawbtn' onClick={handleWithdraw}>
                  Withdraw
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalComponent isOpen={modalIsOpen} closeModal={closeModal} selectedFile={selectedFile} />
      {selectedCustomer && selectedCustomer.files && selectedCustomer.files.length > 0 ? (
        <div style={{ margin: "100px", marginLeft: "20%" }}>
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

export default Details;
