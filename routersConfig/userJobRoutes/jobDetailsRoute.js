import express from "express";
import { Employeeadd, getAllEmployee, getEmployee, updateEmployee } from "../../controllers/userJobControllers/jobDetailsControllers.js";
import { authorization, authorizationOfUpdate } from "../../middlewares/auth/authorization.js";
const route=express.Router();

// userEmployee routers
route.post('/userEmployee/',authorization,Employeeadd);
route.get('/getAllUserEmployee',authorization,getAllEmployee);
route.post('/updateUserEmployee/:userName',authorizationOfUpdate,updateEmployee);
route.get('/getUserEmployee/:userName',authorizationOfUpdate,getEmployee);


export default route;