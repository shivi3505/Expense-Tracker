const apiURL= "http://localhost:3000";
const token= localStorage.getItem('token');
let currentPage= localStorage.getItem('currentPage')?localStorage.getItem('currentPage'):1;
 const expenseLimit= document.getElementById('expenseLimit').value||10;
 localStorage.setItem('limit',expenseLimit);
document.addEventListener("DOMContentLoaded", async () => {
  try{
    const isUserPremium= await axios.get(apiURL+'/user/ispremium',{
       headers: {
                'token':token
            }
    });
    if(isUserPremium.data.isPremium==='yes'){
          document.getElementById("rendere-btn").style.display='none';
          document.getElementById("welcome").textContent= `Welcome Back,${isUserPremium.data.name.split(" ")[0]}`;
              const premiumElements = document.getElementsByClassName('premium');
              for (let i = 0; i < premiumElements.length; i++) {
         premiumElements[i].classList.remove('d-none');
         premiumElements[i].classList.add('d-block'); 
}

    }
    // const page=1;
//    const result= await axios.get(apiURL+`/expenses?page=${page}`,{
//             headers: {
//                 'token':token
//             }
//         });
//    console.log(result);
// const {expenses,...pageData}= result.data;
//    expenses.forEach((res) => displayExpense(res));
//    showPagination(pageData);
    getExpenses(currentPage);
  }catch(err){
     console.log(err);
  }
});

document.getElementById('leaderboard').addEventListener('click',()=>{
  window.location.href= './leaderboard/leaderboard.html';
})
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
    const res = await axios.post(apiURL+'/expenses', expense,
        {
            headers: {
                'token':token
            }
        }

    );
    // console.log(res.data);
    if(res){
        form.reset();
    getExpenses(currentPage);
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
  listItem.className = "itemlist- list-group-item d-flex justify-content-between align-items-center flex-wrap";
  listItem.innerHTML = `
    <div class="fw-bold mb-2">${expense.expenseAmount} ₹ - ${expense.expenseType}</div>
    <div class="text-muted mb-2">${expense.description}</div>
     <button class="btn btn-sm btn-danger me-2" onclick="deleteExpense('${expense.id}')">Delete Expense</button>
      `;

   expenseList.appendChild(listItem);
    
 }
async function deleteExpense(id){

  await axios.delete(apiURL+`/expenses/${id}`,{
      headers: {
        'token':token
      }
  });
  const expensesLength= document.querySelectorAll('list-item').length;
  if(expensesLength===0 && currentPage>0){
    currentPage=currentPage-1;
    localStorage.setItem('currentPage',currentPage);
  }
 // const listItem= button.closest('li');
  document.getElementById(id).remove();
  getExpenses(currentPage);
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
async function download(){
  try{
   const response= await  axios.get('http://localhost:3000/user/download', { headers: {"Authorization" : token} })
       
        if(response.status === 201){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

   
      }catch(err){
        console.log(err);
      }
}

function showPagination({
        currentPage,
        totalItems,
        lastPage,
        hasNextPage,
        nextPage,
        hasPreviousPage,
        previousPage
}){
  const pagination= document.getElementById('page');
 
  pagination.innerHTML=' ';
  if(hasPreviousPage){
   btnPrev= document.createElement('button');
   btnPrev.classList= 'btn btn-primary m-1 '
   btnPrev.innerHTML= `${previousPage}`;
   btnPrev.addEventListener('click',()=>getExpenses(previousPage));
   pagination.appendChild(btnPrev);
  }
   btnCurrent= document.createElement('button');
   btnCurrent.classList= 'btn btn-primary m-1'
   btnCurrent.innerHTML= `${currentPage}`;
   btnCurrent.addEventListener('click',()=>getExpenses(currentPage));
   pagination.appendChild(btnCurrent);
   if(hasNextPage){
   btnNext= document.createElement('button');
   btnNext.classList= 'btn btn-primary m-1'
   btnNext.innerHTML= `${nextPage}`;
   btnNext.addEventListener('click',()=>getExpenses(nextPage));
   pagination.appendChild(btnNext);
  }
}

async function getExpenses(page){
  try{
   const limit= parseInt(localStorage.getItem('limit'));
   localStorage.setItem('currentPage',page);
  const result= await axios.get(apiURL+`/expenses?page=${page}&limit=${limit}`,{
            headers: {
                'token':token
            }
        });
          
   console.log(result);
   const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = '';
const {expenses,...pageData}= result.data;
// currentPage= pageData.lastPage;
   expenses.forEach((res) => displayExpense(res));
   showPagination(pageData);
      }catch(err){
        console.log(err);
      }
}