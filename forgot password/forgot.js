const forgotPasswordForm= document.getElementById('forgot-psw-form');
const apiURL= 'http://localhost:3000'
forgotPasswordForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const email= document.getElementById('email').value;
  try{
  const result= await axios.post(apiURL+'/password/forgotpassword',{
    email:email
  });
  if(result){
    alert('link sent successfully,check your email')
  }
  forgotPasswordForm.reset();
}catch(err){
    console.log(err.response.status);
    console.log(err);
}
})