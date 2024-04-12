import express from "express";
import { employeeLettersadd, getAllemployeeLetters, getemployeeLetters, updateemployeeLetters } from "../../controllers/documentsControllers/employeeLetterController.js";
import { authorization, authorizationOfUpdate } from "../../middlewares/auth/authorization.js";
import upload from "../../middlewares/documentMiddlewares/documentMiddleware.js";
const route=express.Router();

// useremployeeLetters routers
route.post('/useremployeeLetters',authorization,upload.single('file'),employeeLettersadd);
route.get('/getAllUseremployeeLetters',authorization,getAllemployeeLetters);
route.post('/updateUseremployeeLetters/:userName',authorizationOfUpdate,upload.single('file'),updateemployeeLetters);
route.get('/getUseremployeeLetters/:userName',authorizationOfUpdate,getemployeeLetters);


export default route;