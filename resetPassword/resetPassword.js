const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const apiURL= 'http://localhost:3000'
console.log(id);
  document.getElementById("reset-password-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = document.getElementById("newPassword").value;
   try{
    const res = await axios.post(apiURL+`/password/resetpassword/${id}`, {
      password: password
    });

   
    alert(res.data.message)
}catch(err){
console.log(err);
}
});