let count = 334465;
let id=131;
let emp_id=107;
function incrementAccount() {
  count++;
}

function getAccount() {
  return count;
}
function incrementID() {
    id++;
  }
  
function getID() {
    return id;
  }

function incrementEmp_id() {
    emp_id++;
  }
  
function getEmp_id() {
    return emp_id;
  }
  
export { incrementAccount,getAccount ,incrementID,getID,incrementEmp_id,getEmp_id};