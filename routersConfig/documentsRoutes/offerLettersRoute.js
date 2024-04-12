import express from "express";
import { getAllofferLetters, getofferLetters, offerLettersadd, updateofferLetters } from "../../controllers/documentsControllers/offerLettersController.js";
import { authorization, authorizationOfUpdate } from "../../middlewares/auth/authorization.js";
import upload from "../../middlewares/documentMiddlewares/documentMiddleware.js";
const route=express.Router();

// userofferLetters routers
route.post('/userofferLetters',authorization,upload.single('file'),offerLettersadd);
route.get('/getAllUserofferLetters',authorization,getAllofferLetters);
route.post('/updateUserofferLetters/:userName',authorizationOfUpdate,updateofferLetters);
route.get('/getUserofferLetters/:userName',authorizationOfUpdate,upload.single('file'),getofferLetters);


export default route;