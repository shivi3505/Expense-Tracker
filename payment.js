
const cashfree = Cashfree({
                mode: "sandbox",
            });

document.getElementById("rendere-btn").addEventListener("click", async () => {
  const token= localStorage.getItem('token');
         try{ 
          
                const response= await axios.post('http://localhost:3000/pay', {},{
                  headers:{
                    'token':token
                  }
                });
                const paymentSessionId= response.data.paymentSessionId;
                const orderId= response.data.orderId;
                    
                let checkoutOptions = {
                    paymentSessionId: paymentSessionId,
                    redirectTarget: "_modal",
                };
          const result=await cashfree.checkout(checkoutOptions);
          if(result.error){
            console.log("user has closed the popupor there is some paymnt error");
            console.log(result.error);
          }
          if(result.redirect){
            console.log('payment will be redirected');
          }
          if(result.paymentDetails){
            console.log('payment has been completed check for payment status');
            console.log(result.paymentDetails.paymentMessage);
            const Status= await axios.get(`http://localhost:3000/pay-status/${orderId}`,{

              headers:{
                  'token': token
              }
            }
            );
           
            // console.log(Status.data);
            if(Status.data.paymentStatus==='Success'){
                alert(`your payment is Successful`);
                document.getElementById("rendere-btn").style.display='none'
              const premiumElements = document.getElementsByClassName('premium');
              for (let i = 0; i < premiumElements.length; i++) {
         premiumElements[i].classList.remove('d-none');
         premiumElements[i].classList.add('d-block'); 
}

                
            }
            else{
              alert('your payment is fail ');
            }
          }

          }catch(err){
                     
            console.log("Error:",err);
                 }
                
            });


  