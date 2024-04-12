import express from "express";
import { getAllorganization, getorganization, organizationadd, updateorganization } from "../controllers/organizationController/organizationController.js";
import { authorization, authorizationOfUpdate } from "../middlewares/auth/authorization.js";
const route=express.Router();

// userorganizationadd routers
route.post('/userorganizationadd',authorization,organizationadd);
route.get('/getAllUserorganizationadd',authorization,getAllorganization);
route.post('/updateUserorganizationadd/:userName',authorizationOfUpdate,updateorganization);
route.get('/getUserorganizationadd/:userName',authorizationOfUpdate,getorganization);


export default route;