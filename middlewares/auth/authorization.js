import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authorization=async(req,res,next)=>{
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
                const userName=decodedPayload.emailId;
                req.params={
                    userName:userName,
                    mobileNo:mobileNo
                }
                if(decodedPayload.signLogin)
                next();
              else res.status(201).json({message:"token is incorrect "});
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
export const authorizationOfUpdate=async(req,res,next)=>{
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
                const userName=decodedPayload.emailId;
                if(userName===req.params.userName){
                    req.params={
                        userName:userName,
                        mobileNo:mobileNo
                    }
                    if(decodedPayload.signLogin)
                next();
              else res.status(201).json({message:"token is incorrect "});
                }
                else res.status(408).json({message:"userName missmatch"})
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
