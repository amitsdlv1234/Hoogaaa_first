import express from "express";
import { employeeTimeadd, getAllemployeeTime, getemployeeTime, updateemployeeTime } from "../../controllers/userJobControllers/employeeTimeControllers.js";
import { authorization, authorizationOfUpdate } from "../../middlewares/auth/authorization.js";
const route=express.Router();

// userEmployeeTime routers
route.post('/userEmployeeTime',authorization,employeeTimeadd);
route.get('/getAllUserEmployeeTime',authorization,getAllemployeeTime);
route.post('/updateUserEmployeeTime/:userName',authorizationOfUpdate,updateemployeeTime);
route.get('/getUserEmployeeTime/:userName',authorizationOfUpdate,getemployeeTime);


export default route;