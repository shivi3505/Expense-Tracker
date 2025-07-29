 const cashfree = Cashfree({
                mode: "sandbox",
            });
document.getElementById("rendere-btn").addEventListener("click", async () => {
         try{ 
                const response= await axios.post('http://localhost:3000/pay');
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
            const Status= await axios.get(`http://localhost:3000/pay-status/${orderId}`);
            console.log(Status.data);
            if(Status){
                alert(`your payment is ${Status.data.paymentStatus}`);
            }
          }

          }catch(err){
                     
            console.log("Error:",err);
                 }
                
            });