import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MyContext } from './MyContextProvider';
import logo from './DIT BANK.png'

const Transactions = () => {
  const { TransactionsAry } = useContext(MyContext);
  const location = useLocation();
  const trans = TransactionsAry.filter(item => (
    item.Ac === location.state.Ac
  ))

  let num = 1;
  return (
    <div>
      <nav className='nav'>
        <img src={logo} alt='logo' width={100} height={100} />
        <NavLink className="back menu " to={-1}>
          Home
        </NavLink>
      </nav>
      <div className='adminpage'>
        <h1 className='h1'>Transaction History</h1>
        <table>
          <tr>
            <th>S.No</th>
            <th>Account No</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
          </tr>

          {trans && trans.map((item, key) => (
            <tr key={key} className='table1'>
              <td>{num++}.</td>
              <td>{item.Ac}</td>
              <td>{item.transactionAmount}</td>
              <td>{item.transactionType}</td>
              <td>{item.transactionDate.toLocaleDateString()}</td>
            </tr>

          ))}
        </table>
      </div>
    </div>
  );
};

export default Transactions;
