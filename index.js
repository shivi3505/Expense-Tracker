const express= require('express');
const app = express();
const cors= require('cors');
const signupRoute= require('./routes/signupRoute');
const expenseDB= require('./utils/expensesDB');
 const signupModel= require('./models/signupModel');
app.use(express.json());
app.use(cors());
app.use('/',signupRoute);

expenseDB.sync({force:true})
.then(()=>{
    app.listen(3000,()=>{
          console.log('server is running')   });
}).catch((err)=>{
    console.log(err);
})