import express from "express";
const route=express.Router();
// 
import { getAllUserPrimaryDetails, getUserPrimaryDetails, updateUserPrimaryDetails, userPrimaryDetailsadd} from "../controllers/userControllers/userInfo.js";
import { getAllUserContactDetails, getUserContactDetails, updateUserContactDetails, userContactDetailsadd } from "../controllers/userControllers/userContactController.js";
import { getAlluserAddressDetails, getuserAddressDetails, updateuserAddressDetails, userAddressDetailsadd } from "../controllers/userControllers/userAddressDetailsController.js";
import { getAlluserEducationalDetails, getuserEducationalDetails, updateuserEducationalDetails, userEducationalDetailsadd } from "../controllers/userControllers/userEducationalDetails.js";
import { getAlluserIdentityInfoDetails, getuserIdentityInfoDetails, updateuserIdentityInfoDetails, userIdentityInfoDetailsadd } from "../controllers/userControllers/userIdentityInfoController.js";
import { getAlluserAddressProofDetails, getuserAddressProofDetails, updateuserAddressProofDetails, userAddressProofDetailsadd } from "../controllers/userControllers/userAddressProofController.js";
import { authorization, authorizationOfUpdate } from "../middlewares/auth/authorization.js";


// userPrimaryDetails routers
route.post('/userPrimaryDetails',authorization,userPrimaryDetailsadd);
route.get('/getAllUserPrimaryDetails',authorization,getAllUserPrimaryDetails);
route.post('/updateUserPrimaryDetails/:userName',authorizationOfUpdate,updateUserPrimaryDetails);
route.get('/getUserPrimaryDetails/:userName',authorizationOfUpdate,getUserPrimaryDetails);

// userContactDetails routers
route.post('/userContactDetails',authorization,userContactDetailsadd);
route.get('/getAllUserContactDetails',authorization,getAllUserContactDetails);
route.post('/updateUserContactDetails/:userName',authorizationOfUpdate,updateUserContactDetails);
route.get('/getUserContactDetails/:userName',authorizationOfUpdate,getUserContactDetails);

// userAddressDetails routers
route.post('/userAddressDetails',authorization,userAddressDetailsadd);
route.get('/getAllUserAddressDetails',authorization,getAlluserAddressDetails);
route.post('/updateUserAddressDetails/:userName',authorizationOfUpdate,updateuserAddressDetails);
route.get('/getUserAddressDetails/:userName',authorizationOfUpdate,getuserAddressDetails);

// userEducationalDetails routers
route.post('/userEducationalDetails',authorization,userEducationalDetailsadd);
route.get('/getAllUserEducationalDetails',authorization,getAlluserEducationalDetails);
route.post('/updateUserEducationalDetails/:userName',authorizationOfUpdate,updateuserEducationalDetails);
route.get('/getUserEducationalDetails/:userName',authorizationOfUpdate,getuserEducationalDetails);

// userIdentityInfoDetails routers
route.post('/userIdentityInfoDetails',authorization,userIdentityInfoDetailsadd);
route.get('/getAllUserIdentityInfoDetails',authorization,getAlluserIdentityInfoDetails);
route.post('/updateUserIdentityInfoDetails/:userName',authorizationOfUpdate,updateuserIdentityInfoDetails);
route.get('/getUserIdentityInfoDetails/:userName',authorizationOfUpdate,getuserIdentityInfoDetails);

// userAddressProofDetails routers
route.post('/userAddressProofDetails',authorization,userAddressProofDetailsadd);
route.get('/getAllUserAddressProofDetails',authorization,getAlluserAddressProofDetails);
route.post('/updateUserAddressProofDetails/:userName',authorizationOfUpdate,updateuserAddressProofDetails);
route.get('/getUserAddressProofDetails/:userName',authorizationOfUpdate,getuserAddressProofDetails);

export default route;