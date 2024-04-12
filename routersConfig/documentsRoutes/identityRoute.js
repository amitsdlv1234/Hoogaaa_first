import express from "express";
import { getAllidentity, getidentity, identityadd, updateidentity } from "../../controllers/documentsControllers/identityController.js";
import { authorization, authorizationOfUpdate } from "../../middlewares/auth/authorization.js";
import upload from "../../middlewares/documentMiddlewares/documentMiddleware.js";
const route=express.Router();

// useridentity routers
route.post('/useridentity/',authorization,upload.single('file'),identityadd);
route.get('/getAllUseridentity',authorization,getAllidentity);
route.post('/updateUseridentity/:userName',authorizationOfUpdate,upload.single('file'),updateidentity);
route.get('/getUseridentity/:userName',authorizationOfUpdate,getidentity);


export default route;