const signupForm= document.getElementById('signup-form');
const apiURL= "http://localhost:3000/signup"
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
    if(addUser.status==201){
        // let success= document.getElementById('success');
        // success.textContent='Register Successfully';
     // showToast('Registered Successfully!', 'success');
       signupForm.reset();
        console.log(addUser)
        window.location.href= '../Login/login.html';
        // signupForm.reset();
        //document.getElementById('error').textContent='';
    }
    else{
       showToast('Email already exists', 'error');
    }
    

}catch(err){
    
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