import express from "express";
import { getAllrequestNewAssets, getrequestNewAssets, requestNewAssetsadd, updaterequestNewAssets } from "../../controllers/assetsControllers/requestNewAssetsControllers.js";
import { authorization, authorizationOfUpdate } from "../../middlewares/auth/authorization.js";
const route=express.Router();

// userrequestNewAssetsadd routers
route.post('/userrequestNewAssetsadd',authorization,requestNewAssetsadd);
route.get('/getAllUserrequestNewAssetsadd',authorization,getAllrequestNewAssets);
route.post('/updateUserrequestNewAssetsadd/:userName',authorizationOfUpdate,updaterequestNewAssets);
route.get('/getUserrequestNewAssetsadd/:userName',authorizationOfUpdate,getrequestNewAssets);


export default route;