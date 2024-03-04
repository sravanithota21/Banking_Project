import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Narbar';
import AdminPage from './AdminPage';

import LoginForm from './LoginForm';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddCustomer from './AddCustomer';
import CustomerDetails from './CustomerDetails';
import Transactions from './Transactions';
import MyContextProvider from './MyContextProvider';
import Details from './Details';
import AddEmployee from './AddEmployee';
import Access2 from './Access2';
import Access3 from './Access3';
import Detail from './Detail';
import Update from './Update';
import UpdateEmpy from './UpdateEmpy';
import Customer from './Customer';
import UploadFile from './UploadFile';
import Upload from './Upload';

function App() {

  return (
    <Router>

      <MyContextProvider>

        <div>
          {/* <Navbar /> */}

          <Routes>
            <Route exact path="/" element={<LoginForm />} />
            <Route exact path="/AdminPage" element={<AdminPage />} />
            <Route exact path='/AddEmployee' element={<AddEmployee />} />
            <Route exact path='/AddCustomer' element={<AddCustomer />} />
            <Route exact path='/CustomerDetails' element={<CustomerDetails />} />
            <Route exact path='/Transactions' element={<Transactions />} />
            <Route exact path='/Access2' element={<Access2 />} />
            <Route exact path='/Access3' element={<Access3 />} />
            <Route exact path='/Details' element={<Details />} />
            <Route exact path='/Detail' element={<Detail />} />
            <Route exact path='/Update' element={<Update />} />
            <Route exact path='/UpdateEmpy' element={<UpdateEmpy />} />
            <Route exact path='/Customer' element={<Customer />} />
            <Route exact path='/UploadFile' element={<UploadFile />} />
            <Route exact path='/Upload' element={<Upload />} />

          </Routes>
        </div>
      </MyContextProvider>

    </Router>
  );
}

export default App;


// App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Navbar from './Navbar';
// import AdminPage from './AdminPage';
// import EmployeePage from './EmployeePage';
// import LoginForm from './LoginForm';
// import Home from './Home';
// import About from './About';
// import AddCustomer from './AddCustomer';
// import CustomerDetails from './CustomerDetails';
// import Translations from './Translations';
// import { EmployeeProvider, useEmployeeContext } from './EmployeeContext';
// // import { EmployeeProvider, useEmployeeContext } from './EmployeeContext';

// const App = () => {
//   return (
//     <EmployeeProvider>
//       <Router>
//         <AppContent />
//       </Router>
//     </EmployeeProvider>
//   );
// };

// const AppContent = () => {
//   const { isLoggedIn } = useEmployeeContext();

//   return (
//     <div>
//       <Navbar isLoggedIn={"isLoggedIn"}/>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/login" element={<LoginForm />} />
//         {isLoggedIn && (
//           <>
//             <Route path="/admin" element={<AdminPage />} />
//             <Route path="/employee" element={<EmployeePage />} />
//             <Route path="/addcustomer" element={<AddCustomer />} />
//             <Route path="/customerdetails" element={<CustomerDetails />} />
//             <Route path="/translations" element={<Translations />} />
//           </>
//         )}
//       </Routes>
//     </div>
//   );
// };

// export default App;





