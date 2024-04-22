import signIn from "../../models/signLogin/signIn.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const signInStepI = async (req, res) => {
  try {
    const { mobileNo, emailId, password } = req.body;
    console.log(req.body);

    if (!emailId || !mobileNo || !password) {
      console.log("Please fill all details");
      return res.status(201).json({ msg: "Please fill all Fields" });
    }

    // Check if the emailId or mobileNo already exists
    const existingUserWithEmail = await signIn.findOne({ where: { emailId: emailId } });
    const existingUserWithMobile = await signIn.findOne({ where: { mobileNo: mobileNo } });

    if (existingUserWithEmail || existingUserWithMobile) {
      return res.status(200).json({ msg: "Mobile number or emailId is already registered!" });
    }

    // Hash the password
    const hash_password = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await signIn.create({
      emailId: emailId,
      mobileNo: mobileNo,
      password: hash_password,
    });

    // Secret key (should be securely stored on the server)
    const secretKey =process.env.SECRETKEY;
    // Payload for JWT token
    const payload = {
      emailId: emailId,
      mobileNo: mobileNo,
      signLogin:true,
    };
    // Generate the JWT token with 1h expiration
    const signInToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      msg: "signIn registered successfully. Do you want to verify your account?",
      signInToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// otp generator

export const accountVerification = async (req, res) => {
  try {
    const { mobileNo, emailId } = req.body;

    if (mobileNo) {
      const signInMobile = await signIn.findOne({ where: { mobileNo: mobileNo } });

      if (!signInMobile) {
        return res.status(404).json({ msg: "Mobile number is not registered" });
      }

      const mobileIsVerified = signInMobile.isVerifiedMobile;
      console.log("Mobile is verified:", mobileIsVerified);

      if (mobileIsVerified) {
        return res.status(201).json({ msg: "Mobile number is already verified" });
      }

      // OTP generation for mobile
      const mobileOtp = Math.round(Math.random() * 1000000);
      console.log("OTP for mobile: ", mobileOtp);

      // Payload for JWT token for mobile
      const payloadForMobile = {
        mobileOtp: mobileOtp,
        mobileNo: mobileNo,
        signInMobile: signInMobile,
      };

      // Secret key (should be securely stored on the server)
      const secretKey =process.env.SECRETKEY;

      // Generate the JWT token with 10 minutes expiration for mobile
      const tokenForMobile = jwt.sign(payloadForMobile, secretKey, { expiresIn: "10m" });

      console.log("JWT Token for Mobile:", tokenForMobile);

      return res.status(200).json({
        message: "Enter the OTP sent to your mobile number",
        token: tokenForMobile,
        mobileOtp:mobileOtp 
      });
    } else if (emailId) {
      const signInEmail = await signIn.findOne({ where: { emailId: emailId } });

      if (!signInEmail) {
        return res.status(404).json({ msg: "Email is not registered" });
      }

      const emailIsVerified = signInEmail.isVerifiedEmail;
      console.log("Email is verified:", emailIsVerified);

      if (emailIsVerified) {
        return res.status(201).json({ msg: "Email is already verified" });
      }

      // OTP generation for email
      const emailOtp = Math.round(Math.random() * 1000000);
      console.log("OTP for email:", emailOtp);

      // Payload for JWT token for email
      const payloadForEmail = {
        emailOtp: emailOtp,
        emailId: emailId,
        signInEmail: signInEmail,
      };

      // Secret key (should be securely stored on the server)
      const secretKey =process.env.SECRETKEY;

      // Generate the JWT token with 10 minutes expiration for email
      const tokenForEmail = jwt.sign(payloadForEmail, secretKey, { expiresIn: "10m" });

      console.log("JWT Token for Email:", tokenForEmail);

      return res.status(200).json({
        message: "Enter the OTP sent to your email address",
        token: tokenForEmail,
        emailOtp:emailOtp
      });
    } else {
      return res.status(400).json({ msg: "Please provide mobileNo or emailId" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "ERROR", error: error.message });
  }
};


export const otpVerification = async (req, res) => {
  try {
    const {
      signInMobileOtp,
      receivedTokenOfmobile,
      mobileNo,
      signInEmailOtp,
      receivedTokenOfemail,
      emailId,
    } = req.body;
    console.log(
      signInMobileOtp,
      receivedTokenOfmobile,
      mobileNo,
      signInEmailOtp,
      receivedTokenOfemail,
      emailId
    );
    // Secret key
    const secretKey =process.env.SECRETKEY;

    // Function to verify mobile OTP
    const mobileverifie = (token) => {
      return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, async (err, decodedPayload) => {
          if (err) {
            console.error("Invalid token:", err.message);
            reject("time out");
          } else {
            const mobileOtp = decodedPayload.mobileOtp;
            console.log("OTP for mobile:", mobileOtp);
            if (signInMobileOtp === mobileOtp) {
              const signInmobile = await signIn.update(
                { isVerifiedMobile: true },
                { where: { mobileNo: mobileNo } }
              );
              if (signInmobile) {
                resolve("Mobile number verified",token);
              } else {
                reject("Error updating mobile verification status");
              }
            } else {
              reject("Otp is not correct of mobile verification");
            }
          }
        });
      });
    };

    // Function to verify email OTP
    const emailverifie = (token) => {
      return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, async (err, decodedPayload) => {
          if (err) {
            console.error("Invalid token:", err.message);
            reject("time out");
          } else {
            const emailOtp = decodedPayload.emailOtp;
            console.log("OTP of email:", emailOtp);
            if (signInEmailOtp === emailOtp) {
              const signInemail = await signIn.update(
                { isVerifiedEmail: true },
                { where: { emailId: emailId } }
              );
              if (signInemail) {
                resolve("Email verified",token);
              } else {
                reject("Error updating email verification status");
              }
            } else {
              reject("Otp is not correct of email verification");
            }
          }
        });
      });
    };

    // Call mobileverifie, then call emailverifie
    if (signInMobileOtp && receivedTokenOfmobile && mobileNo) {
      mobileverifie(receivedTokenOfmobile)
        .then((mobileResult) => {
          res.status(201).json({ msg: mobileResult });
          return;
        })
        .catch((error) => {
          res.status(400).json({ msg: "Verification failed", error });
        });
    }
    if (signInEmailOtp && receivedTokenOfemail && emailId) {
      emailverifie(receivedTokenOfemail)
        .then((emailResult) => {
          res.status(201).json({ msg: emailResult });
          return;
        })
        .catch((error) => {
          res.status(400).json({ msg: "Verification failed", error });
        });
    }
  } catch (error) {
    res.status(500).json({ msg: "otpverification Fail", error });
  }
};
export const login = async (req, res) => {
  try {
    const { emailId, mobileNo } = req.body;
    console.log(emailId, mobileNo);
    // Secret key (should be securely stored)
    const secretKey =process.env.SECRETKEY;
    let token;

    // Check if both emailId and mobileNo are provided
    if (!emailId && !mobileNo) {
      return res.status(400).json({ msg: "Please provide emailId or mobileNo" });
    }

    if (mobileNo) {
      let user = await signIn.findOne({ where: { mobileNo: mobileNo } });
      if (!user) {
        return res.status(404).json({ msg: "User not registered with this mobile number" });
      }

      // Check if mobile is verified
      if (user.isVerifiedMobile) {
        // Payload for JWT token for mobile
        const payloadForMobile = {
          mobileNo: mobileNo,
          emailId:user.emailId,
          user: user
        };

        // Generate the JWT token with 1 hour expiration for mobile
        token = jwt.sign(payloadForMobile, secretKey, { expiresIn: "1h" });
        return res.status(201).json({ message: "Enter your Password", token });
      } else {
        // Generate OTP for mobile number
        const mobileOtp = Math.round(Math.random() * 1000000);
        console.log("OTP of mobile", mobileOtp);

        // Payload for JWT token for mobile
        const payloadForMobile = {
          mobileOtp: mobileOtp,
          mobileNo: mobileNo,
          user: user
        };

        // Generate the JWT token with 1 hour expiration for mobile
        token = jwt.sign(payloadForMobile, secretKey, { expiresIn: "1h" });
        return res.status(201).json({ message: "Verify your mobile number",mobileOtp:mobileOtp, token:token});
      }

    } else {
      let user = await signIn.findOne({ where: { emailId: emailId } });

      if (!user) {
        return res.status(404).json({ msg: "User not registered with this emailId" });
      }

      // Check if email is verified
      if (user.isVerifiedEmail) {
        // Payload for JWT token for email
        const payloadForEmail = {
          emailId: emailId,
          mobileNo:user.mobileNo,
          user: user
        };

        // Generate the JWT token with 1 hour expiration for email
        token = jwt.sign(payloadForEmail, secretKey, { expiresIn: "1h" });
        return res.status(201).json({ message: "Enter your Password", token });
      } else {
        // Generate OTP for email
        const emailOtp = Math.round(Math.random() * 1000000);
        console.log("OTP of email", emailOtp);

        // Payload for JWT token for email
        const payloadForEmail = {
          emailOtp: emailOtp,
          emailId: emailId,
          user: user
        };

        // Generate the JWT token with 1 hour expiration for email
        token = jwt.sign(payloadForEmail, secretKey, { expiresIn: "1h" });
        return res.status(201).json({ message: "Verify your email", token ,emailOtp:emailOtp});
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

export const changePasswordRequest = async (req, res) => {
  try {
    const { emailId, mobileNo } = req.body;
  
    // Secret key (should be securely stored)
    const secretKey =process.env.SECRETKEY;
    // Check if both emailId and password are provided
    if (!emailId&&!mobileNo) {
      return res.status(400).json({ msg: "Please provide emailId or MobileNo" });
    }
    let sign
    if(emailId){
      // Find signIn by emailId
    sign = await signIn.findOne({ where: { emailId: emailId } });

    // If signIn not found
    if (!sign) {
      return res.status(404).json({ msg: "signIn not registered" });
    }
    const otpgen = Math.round(Math.random() * 1000000);
    console.log("OTP ", otpgen);

    // Payload for JWT token
    const payload = {
      otpgen: otpgen,
      emailId: emailId,
    };
 // Generate the JWT token with 5 minutes expiration
 const token = jwt.sign(payload, secretKey, { expiresIn: "5m" }); // 'm' for minutes
 // Return the JWT token
 res
   .status(200)
   .json({ msg: "Opt send on email " + emailId, token });
    }
  else{
      // Find signIn by mobileNo
      sign = await signIn.findOne({ where: { mobileNo: mobileNo } });

      // If signIn not found
      if (!sign) {
        return res.status(404).json({ msg: "signIn not registered" });
      }
      const otpgen = Math.round(Math.random() * 1000000);
      console.log("OTP ", otpgen);
  
      // Payload for JWT token
      const payload = {
        otpgen: otpgen,
        mobileNo:mobileNo,
      };
   // Generate the JWT token with 5 minutes expiration
   const token = jwt.sign(payload, secretKey, { expiresIn: "5m" }); // 'm' for minutes
   // Return the JWT token
   res
     .status(200)
     .json({ msg: "Opt send on mobile no. " + sign.mobileNo, token ,otpgen:otpgen});
      }
  }  

    
 catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error", error: error.message });
  }
};
export const passwordChangeotpVeri = async (req, res) => {
  try {
    const { otp, receivedToken } = req.body;
    // Secret key
    const secretKey =process.env.SECRETKEY;
    jwt.verify(receivedToken, secretKey, async (err, decodedPayload) => {
      if (err) {
        console.error("Invalid token:", err.message);
        res.status(200).json({ msg: "time out" });
      } else {
        // Access specific data
        const otpgen = decodedPayload.otpgen;
        // console.log("OTP:", otpgen);
        if (otp == otpgen) {
          res.status(200).json({ msg: "Enter your new password" });
        } else {
          res.status(200).json({ msg: "Otp is not correct" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "otpverification Fail", error });
  }
};
export const changesignInpassword = async (req, res) => {
  try {
    const { mobileNo, emailId, newPassword } = req.body;
    // Hash the password
    const hash_password = await bcrypt.hash(newPassword, 10);
    let passupdate=null;
    if (mobileNo) {
     passupdate= await signIn.update(
        { password: hash_password },
        { where: { mobileNo: mobileNo } }
      );
    }
    if (emailId) {
      passupdate=await signIn.update(
        { password: hash_password },
        { where: { emailId: emailId } }
      );
    }
    if(!passupdate) res.status(200).json({ msg: "password not updated" });
    res.status(200).json({ msg: "password updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error : password not updated" }, error);
  }
};
export const passwordLogin = async (req, res) => {
  try {
    const { emailId, mobileNo, password} = req.body;
    // Find signIn by emailId
    let sign;
    if (emailId) {
      sign = await signIn.findOne({ where: { emailId: emailId } });
    }
    if (mobileNo) {
      sign = await signIn.findOne({ where: { mobileNo: mobileNo } });
    }

    console.log(password, sign.password);
    const isPasswordMatch = await bcrypt.compare(password, sign.password);

    // If password matches, return success
    if (isPasswordMatch) {
      // Payload for JWT token for mobile
      const payload = {
        mobileNo: mobileNo,
        emailId: emailId,
        signLogin:true
      };

      // Secret key (should be securely stored on the server)
      const secretKey =process.env.SECRETKEY;

      // Generate the JWT token with 10 minutes expiration for mobile
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      return res
        .status(200)
        .json({
          msg: "login successful ....!",
        token:token});
    } else {
      return res.status(401).json({ msg: "Password not match" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error", error });
  }
};
