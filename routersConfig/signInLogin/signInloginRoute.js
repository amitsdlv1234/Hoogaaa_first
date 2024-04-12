import express from "express";
import { accountVerificationAuth, changePasswordVerificationAuth, otpVerificationAuth } from "../../middlewares/auth/signInLoginAuth.js";
import { accountVerification, changePasswordRequest, changesignInpassword, login, otpVerification, passwordChangeotpVeri, passwordLogin, signInStepI } from "../../controllers/signInLogin/signInLogin.js";
const router=express.Router();


router.post('/signInStepI',signInStepI);
router.post('/otpVerification',otpVerificationAuth,otpVerification);
router.post('/passwordLogin',accountVerificationAuth,passwordLogin);
router.post('/accountVerification',accountVerificationAuth,accountVerification);
router.post('/login',login);
router.post('/changepasswordRequest',accountVerificationAuth,changePasswordRequest);
router.post('/passwordChangeotpVeri',changePasswordVerificationAuth,passwordChangeotpVeri);
router.put('/changeUserpassword',accountVerificationAuth,changesignInpassword);


export default router;