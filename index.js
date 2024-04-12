import express from "express";
import bodyParser from "body-parser";
import Connection from "./databaseConfig/db.js";
import dotenv from 'dotenv';
// Importing all your route configurations
import userRouter from "./routersConfig/userRoutes.js";
import organizationroute from "./routersConfig/organizationRoute.js";
import jobDetailsroute from "./routersConfig/userJobRoutes/jobDetailsRoute.js";
import employeeTimeroute from "./routersConfig/userJobRoutes/employeeTimeRoute.js";
import degreeCertificateroute from "./routersConfig/documentsRoutes/degreeCertificatesRoute.js";
import employeeLettersroute from "./routersConfig/documentsRoutes/empolyeeLettersRoute.js";
import identityroute from "./routersConfig/documentsRoutes/identityRoute.js";
import offerLettersroute from "./routersConfig/documentsRoutes/offerLettersRoute.js";
import previousExperienceroute from "./routersConfig/documentsRoutes/previousExpRoute.js";
import signatureroute from "./routersConfig/documentsRoutes/signatureRoute.js";
import assignAssetsroute from "./routersConfig/assetsRoutes/assignAssetRoute.js";
import replacementRequestroute from "./routersConfig/assetsRoutes/replacementRequestRoute.js";
import requestNewAssetsroute from "./routersConfig/assetsRoutes/requestNewAssetRoute.js";
// models
import degreeCertificates from "./models/documents/degreeCertificates.js";
import employeeLetters from "./models/documents/employeeLetters.js";
import UserPrimaryDetails from "./models/userModel/userPrimaryDetails.js";
import UserContactDetails from "./models/userModel/userContactDetails.js";
import UserAddressProof from "./models/userModel/userAddressProof.js";
import userAddressDetails from "./models/userModel/userAddressDetails.js";
import UserEducationalDetails from "./models/userModel/userEducationalDetails.js";
import UserIdentityInfo from "./models/userModel/userIdentityInfo.js";
import employeeTime from "./models/userJobModels/employeeTimeModel.js";
import Employee from "./models/userJobModels/jobDetailsModel.js";
import organization from "./models/organization/organizationModel.js";
import identity from "./models/documents/identity.js";
import offerLetters from "./models/documents/offerLetters.js";
import previousExperience from "./models/documents/previousExperience.js";
import signature from "./models/documents/signatures.js";
import replacementRequest from "./models/assets/replacementRequest.js";
import assignAssets from "./models/assets/assignAssets.js";
import requestNewAssets from "./models/assets/requestNewAssets.js";
import userSignIn from './routersConfig/signInLogin/signInloginRoute.js'
import SignIn from "./models/signLogin/signIn.js";
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your routes
app.get('/', (req, res) => {
  res.send('api running new deploy');
});

app.use('/signIn',userSignIn);
app.use('/userRouter', userRouter);
app.use('/organizationroute', organizationroute);
app.use('/jobDetailsroute', jobDetailsroute);
app.use('/employeeTimeroute', employeeTimeroute);
app.use('/degreeCertificateroute', degreeCertificateroute);
app.use('/employeeLettersroute', employeeLettersroute);
app.use('/identityroute', identityroute);
app.use('/offerLettersroute', offerLettersroute);
app.use('/previousExperienceroute', previousExperienceroute);
app.use('/signatureroute', signatureroute);
app.use('/assignAssetsroute', assignAssetsroute);
app.use('/replacementRequestroute', replacementRequestroute);
app.use('/requestNewAssetsroute', requestNewAssetsroute);

console.log(process.env.DB_USERNAME);
console.log(process.env.DB_DATABASENAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);
(async () => {
  try {
    await Connection.authenticate();
    console.log('Connection has been established successfully.');

    // Syncing your models with the database
    await SignIn.sync();
    await UserPrimaryDetails.sync();
    await UserContactDetails.sync();
    await UserAddressProof.sync();
    await userAddressDetails.sync();
    await UserEducationalDetails.sync();
    await UserIdentityInfo.sync();
    await employeeTime.sync();
    await Employee.sync();
    await organization.sync();
    await degreeCertificates.sync();
    await employeeLetters.sync();
    await identity.sync();
    await offerLetters.sync();
    await previousExperience.sync();
    await signature.sync();
    await replacementRequest.sync();
    await assignAssets.sync();
    await requestNewAssets.sync();

    const port = process.env.PORT|| 8809;
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
