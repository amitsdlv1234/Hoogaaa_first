import express from "express";
import upload from "../../middlewares/documentMiddlewares/documentMiddleware.js";
import { degreeCertificatesadd, getAlldegreeCertificates, getdegreeCertificates, updatedegreeCertificates } from "../../controllers/documentsControllers/degreeCertificateController.js";
import { authorization, authorizationOfUpdate } from "../../middlewares/auth/authorization.js";
const route=express.Router();

// userdegreeCertificates routers
route.post('/userdegreeCertificates',authorization,upload.single('file'),degreeCertificatesadd);
route.get('/getAllUserdegreeCertificates',authorization,getAlldegreeCertificates);
route.post('/updateUserdegreeCertificates/:userName',authorizationOfUpdate,upload.single('file'),updatedegreeCertificates);
route.get('/getUserdegreeCertificates/:userName',authorizationOfUpdate,getdegreeCertificates);


export default route;