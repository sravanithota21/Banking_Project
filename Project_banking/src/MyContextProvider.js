import React, { useState } from 'react'

export const MyContext = React.createContext();

const MyContextProvider = ({ children }) => {

  const [TransactionsAry,setTranscationsAry]=useState([
    {
      "transactionDate":new Date(2023, 1, 10) ,
      "transactionAmount":1000,
      "transactionType": "Credit",
      "Ac":"334455"
    },
    {
      "transactionDate":new Date(2023,1,13) ,
      "transactionAmount":1000,
      "transactionType": "Credit",
      "Ac":"334456"
    },
    {
      "transactionDate":new Date(2023,2,3) ,
      "transactionAmount":1000,
      "transactionType": "Credit",
      "Ac":"334457"
    },
    {
      "transactionDate":new Date(2023,2,21) ,
      "transactionAmount":1000,
      "transactionType": "Credit",
      "Ac":"334458"
    },
    {
      "transactionDate":new Date(2023,4,23) ,
      "transactionAmount":1000,
      "transactionType": "Credit",
      "Ac":"334459"
    },
    {
      "transactionDate":new Date(2023,5,14) ,
      "transactionAmount":1000,
      "transactionType": "Credit",
      "Ac":"334460"
    },
    {
      "transactionDate":new Date(2023,5,28) ,
      "transactionAmount":1000,
      "transactionType": "Credit",
      "Ac":"334461"
    },
    {
      "transactionDate":new Date(2023,7,3) ,
      "transactionAmount":1000,
      "transactionType": "Credit",
      "Ac":"334462"
    },
    {
      "transactionDate":new Date(2023,8,10) ,
      "transactionAmount":1000,
      "transactionType": "Credit",
      "Ac":"334463"
    },
    {
      "transactionDate":new Date(2023,9,9) ,
      "transactionAmount":1000,
      "transactionType": "Credit",
      "Ac":"334464"
    },
  ]);
  const [myData,setMyData]=useState([
    {
    "Customer_name":'Sravani',
    "username":"sravani@gmail.com",
    "password":"12345678",
    "re_password":"12345678",
    "ID":"DIT121",
    "Ac":"334455",
    "phone":"998887766",
    "adno":"132133",
    "address":"guntur",
    "amount":1000,
  //  "files":[]
  },
  {
    "Customer_name":'Yamini',
    "username":"yamini@gmail.com",
    "password":"12345678",
    "re_password":"12345678",
    "ID":"DIT122",
    "Ac":"334456",
    "phone":"998456766",
    "adno":"1322433",
    "address":"Ongole",
    "amount":1000,
  },
  {
    "Customer_name":'Aravind',
    "username":"aravind@gmail.com",
    "password":"12345678",
    "re_password":"12345678",
    "ID":"DIT123",
    "Ac":"334457",
    "phone":"996675675",
    "adno":"13657657",
    "address":"guntur",
    "amount":1000, 
  },

  {
    "Customer_name":'Ashok',
    "username":"ashok@gmail.com",
    "password":"12345678",
    "re_password":"12345678",
    "ID":"DIT124",
    "Ac":"334458",
    "phone":"9943675675",
    "adno":"13612657",
    "address":"guntur",
    "amount":1000,
  },
  {
    "Customer_name":'Siva',
    "username":"siva@gmail.com",
    "password":"12345678",
    "re_password":"12345678",
    "ID":"DIT125",
    "Ac":"334459",
    "phone":"986675675",
    "adno":"15657657",
    "address":"guntur",
    "amount":1000,  
  },
  {
    "Customer_name":'Dharani',
    "username":"dharani@gmail.com",
    "password":"12345678",
    "re_password":"12345678",
    "ID":"DIT126",
    "Ac":"334460",
    "phone":"912345675",
    "adno":"13543557",
    "address":"guntur",
    "amount":1000,
  },
  {
    "Customer_name":'Swathi',
    "username":"swathi@gmail.com",
    "password":"12345678",
    "re_password":"12345678",
    "ID":"DIT127",
    "Ac":"334461",
    "phone":"886675675",
    "adno":"11157657",
    "address":"guntur",
    "amount":1000,  
  },
  {
    "Customer_name":'Ram',
    "username":"ram@gmail.com",
    "password":"12345678",
    "re_password":"12345678",
    "ID":"DIT128",
    "Ac":"334462",
    "phone":"888975675",
    "adno":"13653657",
    "address":"guntur",
    "amount":1000, 
  },
  {
    "Customer_name":'Satwika',
    "username":"satwika@gmail.com",
    "password":"12345678",
    "re_password":"12345678",
    "ID":"DIT129",
    "Ac":"334463",
    "phone":"776675675",
    "adno":"13347657",
    "address":"guntur",
    "amount":1000,
  },
  {
    "Customer_name":'Anjali',
    "username":"anjali@gmail.com",
    "password":"12345678",
    "re_password":"12345678",
    "ID":"DIT130",
    "Ac":"334464",
    "phone":"95675675",
    "adno":"13342657",
    "address":"guntur",
    "amount":1000, 
  },
 
  ]);
  
  const [employeeList,setEmployeeList]=useState([
    {
      "Employee_name":"user1",
      "email":"user1@gmail.com",
      "Employee_password":"user1@123",
      "Employee_ID":"DIT-A100",
      "Employee_Address":"Guntur",
      "Employee_designations":"Manager",
      "Employee_Access_leval":1
    },
    {
      "Employee_name":"user2",
      "email":"user2@gmail.com",
      "Employee_password":"user2@123",
      "Employee_ID":"DIT-A101",
      "Employee_Address":"Guntur",
      "Employee_designations":"Cashier",
      "Employee_Access_leval":2
    },
    {
      "Employee_name":"user3",
      "email":"user3@gmail.com",
      "Employee_password":"user3@123",
      "Employee_ID":"DIT-A102",
      "Employee_Address":"Guntur",
      "Employee_designations":"Accountant",
      "Employee_Access_leval":3
    },
    {
      "Employee_name":"user4",
      "email":"user4@gmail.com",
      "Employee_password":"user4@123",
      "Employee_ID":"DIT-A103",
      "Employee_Address":"Guntur",
      "Employee_designations":"Customer Services",
      "Employee_Access_leval":1
    },
    {
      "Employee_name":"user5",
      "email":"user5@gmail.com",
      "Employee_password":"user5@123",
      "Employee_ID":"DIT-A104",
      "Employee_Address":"Guntur",
      "Employee_designations":"Cashier",
      "Employee_Access_leval":2
    },
    {
      "Employee_name":"user6",
      "email":"user6@gmail.com",
      "Employee_password":"user6@123",
      "Employee_ID":"DIT-A105",
      "Employee_Address":"Guntur",
      "Employee_designations":"Accountant",
      "Employee_Access_leval":3
    },
    {
      "Employee_name":"user7",
      "email":"user7@gmail.com",
      "Employee_password":"user7@123",
      "Employee_ID":"DIT-A106",
      "Employee_Address":"Guntur",
      "Employee_designations":"Manager",
      "Employee_Access_leval":1
    }
  ]);

  const updataEmp =(newdata)=>{
    setEmployeeList(newdata);
  }
  const update = (newname) => {
    setMyData(newname);
  }
  const updateTrans =(newtrans)=>{
    setTranscationsAry(newtrans);
  }
  return (
    <div>
      <MyContext.Provider value={{ update,myData,employeeList,updataEmp ,TransactionsAry,updateTrans}}>
        {children}
      </MyContext.Provider>
    </div>
  )
}

export default MyContextProvider;