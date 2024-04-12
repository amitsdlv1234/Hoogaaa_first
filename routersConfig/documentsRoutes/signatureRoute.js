import express from "express";
import { getAllsignature, getsignature, signatureadd, updatesignature } from "../../controllers/documentsControllers/signatureController.js";
import { authorization, authorizationOfUpdate } from "../../middlewares/auth/authorization.js";
import upload from "../../middlewares/documentMiddlewares/documentMiddleware.js";
const route=express.Router();

// usersignatureadd routers
route.post('/usersignatureadd',authorization,upload.single('file'),signatureadd);
route.get('/getAllUsersignatureadd',authorization,getAllsignature);
route.post('/updateUsersignatureadd/:userName',authorizationOfUpdate,upload.single('file'),updatesignature);
route.get('/getUsersignatureadd/:userName',authorizationOfUpdate,getsignature);


export default route;