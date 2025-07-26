const {Sequelize}= require('sequelize');

const sequelize= new Sequelize('expensetracker_db','root','Sql@1234',{
    host:'localhost',
    dialect:'mysql'
});
 async ()=>{
    try{
        await sequelize.authenticate();
        console.log('connection has been created');
    }catch(err){
        console.log(err);
    }
 }

 module.exports= sequelize;