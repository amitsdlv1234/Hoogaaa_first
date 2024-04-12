import express from "express";
import { assignAssetsadd, getAllassignAssets, getassignAssets, updateassignAssets } from "../../controllers/assetsControllers/assignAssetsControllers.js";
import { authorization, authorizationOfUpdate } from "../../middlewares/auth/authorization.js";
const route=express.Router();

// userassignAssetsadd routers
route.post('/userassignAssetsadd',authorization,assignAssetsadd);
route.get('/getAllUserassignAssetsadd',authorization,getAllassignAssets);
route.post('/updateUserassignAssetsadd/:userName',authorizationOfUpdate,updateassignAssets);
route.get('/getUserassignAssetsadd/:userName',authorizationOfUpdate,getassignAssets);


export default route;