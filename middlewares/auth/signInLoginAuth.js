import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const otpVerificationAuth=async(req,res,next)=>{
    try {
        let  token = req.headers.authorization; 
        
        if(token){
            token=token.slice(7);
            // console.log(token);
            const secretKey =process.env.SECRETKEY;
            jwt.verify(token, secretKey, async (err, decodedPayload) => {
              if (err) {
                console.error("Invalid token:", err.message);
                res.status(200).json({ msg: "time out" });
              } else {
                // Access specific data
                // console.log(decodedPayload);
                if(decodedPayload.mobileNo){
                    const receivedTokenOfmobile = token;
                    const mobileNo=decodedPayload.mobileNo;
                    console.log("req.body : ",req.body);
                    req.body={
                        ...req.body,mobileNo,receivedTokenOfmobile
                    }
                    console.log(req.body);
                    next();
                }
                if(decodedPayload.emailId){
                    const emailId=decodedPayload.emailId;
                    const receivedTokenOfemail =token;
                    console.log(receivedTokenOfemail, emailId);
                    req.body={
                        ...req.body,receivedTokenOfemail,emailId
                    }
                    next();
                }
              }
            });
        }
        else{
            res.status(401).json({msg:"unauthorized user"});
        }
    } catch (error) {
        console.log(error);
     res.status(500).json(error);
    }
}

export const accountVerificationAuth=async(req,res,next)=>{
    try {
        let  token = req.headers.authorization;
        if(token){
            const secretKey =process.env.SECRETKEY;
            token=token.slice(7);
            jwt.verify(token, secretKey, async (err, decodedPayload) => {
              if (err) {
                console.error("Invalid token:", err.message);
                res.status(200).json({ msg: "time out" });
              } else {
                // Access specific data
                const mobileNo=decodedPayload.mobileNo;
                const emailId=decodedPayload.emailId;
                req.body={
                    ...req.body,mobileNo,emailId,token
                }
                next();
              }
            });
        }
        else{
            res.status(401).json({msg:"unauthorized user"});
        }
    } catch (error) {

     res.status(500).json({error});
    }
}
export const changePasswordVerificationAuth=async(req,res,next)=>{
    try {
        let  token = req.headers.authorization;
        if(token){
            const secretKey =process.env.SECRETKEY;
            token=token.slice(7);
            jwt.verify(token, secretKey, async (err, decodedPayload) => {
              if (err) {
                console.error("Invalid token:", err.message);
                res.status(200).json({ msg: "time out" });
              } else {
                // Access specific data
                const receivedToken=token;

                req.body={
                    ...req.body,receivedToken
                }
                next();
              }
            });
        }
        else{
            res.status(401).json({msg:"unauthorized user"});
        }
    } catch (error) {
     res.status(500).json(error);
    }
}