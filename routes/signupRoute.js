const express= require('express');
const route= express.Router();
const signupController= require('../controllers/signupController')
route.post('/adduser',signupController.addUsers);


module.exports= route;