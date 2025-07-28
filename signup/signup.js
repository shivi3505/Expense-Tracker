const signupForm= document.getElementById('signup-form');
const apiURL= "http://localhost:3000/signup"
signupForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    document.getElementById('name-error').textContent=' ';
    document.getElementById('email-error').textContent=' ';
    document.getElementById('password-error').textContent=' ';
    const name= document.getElementById('name').value;
    const email= document.getElementById('email').value;
    const password= document.getElementById('password').value;
    if(!name){
      document.getElementById('name-error').textContent="name is required";
    }
    if(!email){
      document.getElementById('email-error').textContent="email is required";
    }
    if(!password){
      document.getElementById('password-error').textContent="password is required";
    }
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
       
        console.log(addUser)
        window.location.href= '../Login/login.html';
        signupForm.reset();
        // signupForm.reset();
        //document.getElementById('error').textContent='';
    }
 
    

}catch(err){
    
    // const error= document.getElementById('error');
    //     error.textContent= 'Email already exist'

console.log(err);
}

}
)
// function showToast(message, type) {
//   const toast = document.getElementById('toast');
//   toast.textContent = message;
//   toast.className = `toast ${type}`; 
//   toast.style.opacity = 1;

  
//   setTimeout(() => {
//     toast.style.opacity = 0;
//   }, 3000);
// }