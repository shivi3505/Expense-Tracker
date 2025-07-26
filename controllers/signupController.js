const Users= require('../models/signupModel')
const addUsers= async (req,res)=>{
    try{
        const userData= req.body;
        const user= await Users.create(userData);
        res.status(201).json(user);

    }catch(err){
      res.status(500).json({message:err.message});
    }

}


module.exports={
    addUsers

}