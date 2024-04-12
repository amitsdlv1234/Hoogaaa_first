import express from "express";
import { getAllreplacementRequest, getreplacementRequest, replacementRequestadd, updatereplacementRequest } from "../../controllers/assetsControllers/replacementRequestControllers.js";
import { authorization, authorizationOfUpdate } from "../../middlewares/auth/authorization.js";
const route=express.Router();

// userreplacementRequestadd routers
route.post('/userreplacementRequestadd',authorization,replacementRequestadd);
route.get('/getAllUserreplacementRequestadd',authorization,getAllreplacementRequest);
route.post('/updateUserreplacementRequestadd/:userName',authorizationOfUpdate,updatereplacementRequest);
route.get('/getUserreplacementRequestadd/:userName',authorizationOfUpdate,getreplacementRequest);


export default route;