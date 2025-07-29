const apiURL= "http://localhost:3000/expenses";
const token= localStorage.getItem('token')
document.addEventListener("DOMContentLoaded", async () => {
  try{
   const result= await axios.get(apiURL,{
            headers: {
                'token':token
            }
        });
//    console.log(result);
   result.data.forEach((res) => displayExpense(res));
    
  }catch(err){
     console.log(err);
  }
});
const form=document.getElementById("expenseForm");

form.addEventListener("submit", submitForm);
function submitForm(e){
  e.preventDefault();
  let expenseAmount = document.getElementById("expenseamount").value;
  let expenseType = document.getElementById("expensetype").value;
  let description = document.getElementById("description").value;
//   console.log(expenseAmount,expenseType,description);
  const expense = {
    expenseAmount,
    expenseType,
     description
  }
//  console.log(expense);


    addExpense(expense);

 // expenselist.push(expense);
  //localStorage.setItem("expense",JSON.stringify(expenselist));
  //displayExpense(expense);
  //form.reset();
}
 async function addExpense(expense) {
  try {
    const res = await axios.post(apiURL, expense,
        {
            headers: {
                'token':token
            }
        }

    );
    // console.log(res.data);
    if(res){
        form.reset();
    displayExpense(res.data);
    }
  } catch (err) {
     console.log("Error posting:", err.message);
  }
}

function displayExpense(expense){
  const expenseList = document.getElementById("expenseList");
  const listItem = document.createElement("li");
  listItem.id= expense.id;
  listItem.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap";
  listItem.innerHTML = `
    <div class="fw-bold mb-2">${expense.expenseAmount} ₹ - ${expense.expenseType}</div>
    <div class="text-muted mb-2">${expense.description}</div>
     <button class="btn btn-sm btn-danger me-2" onclick="deleteExpense('${expense.id}')">Delete Expense</button>
      `;

   expenseList.appendChild(listItem);
    
 }
async function deleteExpense(id){

  await axios.delete(apiURL+`/${id}`,{
      headers: {
        'token':token
      }
  });
 // const listItem= button.closest('li');
  document.getElementById(id).remove();
  
}
// function editExpense(expense){
//   document.getElementById("expenseamount").value=expense.expenseAmount;
//   document.getElementById("expensetype").value=expense.expenseType;
//   document.getElementById("description").value=expense.description;
//   editId= expense.id;
//   const updateButton = document.createElement("button");
//   updateButton.textContent="Update Expense";
  
// }
async function updateExpense(expense,editId){
 try{
  const id= expense.id;
  
   const result= await axios.put(apiURL+`/${editId}`,expense);
//    console.log(id);

 }catch(err){
  console.log(err);
 }
   const listItem=document.getElementById(editId);
    listItem.innerHTML = `
    <div class="fw-bold mb-2">${expense.expenseAmount} ₹ - ${expense.expenseType}</div>
    <div class="text-muted mb-2">${expense.description}</div>
     <button class="btn btn-sm btn-danger me-2" onclick="deleteExpense('${expense.id}', this)">Delete</button>
     `;
   
    const submitButton = document.querySelector("button[type='submit']");
    submitButton.textContent="Add Expense";
}