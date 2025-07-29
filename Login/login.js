const loginForm= document.getElementById('login-form');
apiURL= 'http://localhost:3000/login'
loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
   document.getElementById('email-error').textContent='';
   document.getElementById('password-error').textContent='';
   const email= document.getElementById('email').value;
   const password= document.getElementById('password').value;
   const login= {
    email,
    password
   }
   try{
    const userLogin= await axios.post(apiURL,login);
    console.log(userLogin.data);
      //  loginForm.reset();
      //   window.alert('Login Successfully')
      if(userLogin){
         localStorage.setItem('token',userLogin.data.token)
         loginForm.reset();
         alert('Login Successfully')
         window.location.href= '../dashboard.html';
      }
    
   }catch(err){
    console.log(err.response.status);
    
        const status= err.response.status;
        if(status===404){
        document.getElementById('email-error').textContent='Email is incorrect' 
     }
     if(status==401){
        document.getElementById('password-error').textContent= 'Password is incorrect';
     }

    
  console.log(`error: ${err}`);
   }
})