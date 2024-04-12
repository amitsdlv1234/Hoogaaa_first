import express from "express";
import { getAllpreviousExperience, getpreviousExperience, previousExperienceadd, updatepreviousExperience } from "../../controllers/documentsControllers/previousExperienceController.js";
import { authorization, authorizationOfUpdate } from "../../middlewares/auth/authorization.js";
import upload from "../../middlewares/documentMiddlewares/documentMiddleware.js";
const route=express.Router();

// userpreviousExperienceadd routers
route.post('/userpreviousExperienceadd',authorization,upload.single('file'),previousExperienceadd);
route.get('/getAllUserpreviousExperienceadd',authorization,getAllpreviousExperience);
route.post('/updateUserpreviousExperienceadd/:userName',authorizationOfUpdate,upload.single('file'),updatepreviousExperience);
route.get('/getUserpreviousExperienceadd/:userName',authorizationOfUpdate,getpreviousExperience);


export default route;