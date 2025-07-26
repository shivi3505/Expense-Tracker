const signupForm= document.getElementById('signup-form');
const apiURL= "http://localhost:3000/adduser"
signupForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const name= document.getElementById('name').value;
    const email= document.getElementById('email').value;
    const password= document.getElementById('password').value;
const user={
    name: name,
    email:email,
    password: password
}
try{
    const addUser= await axios.post(apiURL,user);
    if(addUser){
        // let success= document.getElementById('success');
        // success.textContent='Register Successfully';
        showToast('Registered Successfully!', 'success');
        console.log(addUser)
        signupForm.reset();
        //document.getElementById('error').textContent='';
    }
    

}catch(err){
    showToast('Email already exists', 'error');
    // const error= document.getElementById('error');
    //     error.textContent= 'Email already exist'

console.log(err);
}

}
)
function showToast(message, type) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type}`; 
  toast.style.opacity = 1;

  
  setTimeout(() => {
    toast.style.opacity = 0;
  }, 3000);
}