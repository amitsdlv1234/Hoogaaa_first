// user profile related api's
import signature from "../../models/documents/signatures.js";

import UserPrimaryDetails from "../../models/userModel/userPrimaryDetails.js";
import fs from "fs";
export const signatureadd = async (req, res) => {
  try {
    const user = req.body;
    const path=req.file.path;
    // console.log(path);
    const {userName}=req.params;
     // Check if user data is empty
     if (!user || Object.keys(user).length === 0) {
      return res.status(400).json({ message: "User data is required." });
    }
    const present = await signature.findOne({
      where: { userName:userName },
    });
    if (present)
      res.status(202).json({ message: "userName is already register" });
    const userPresent=await UserPrimaryDetails.findOne({where :{userName:userName}});
    if(userPresent){
      const newUser = await signature.create({userName:userName,fileName:user.fileName,path:path});

      res.status(200).json({ newUser });
    }
    else res.status(201).json({msg:"User/employee not registered"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
// getting all users
export const getAllsignature = async (req, res) => {
  try {
    const user = await signature.findAll({});
    if (!user) res.status(201).json({ message: "Data not present" });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const getsignature = async (req, res) => {
  try {
    const {userName}=req.params;
    if(userName){
        const user = await signature.findOne({
            where: { userName: userName },
          });
          if (!user) res.status(201).json({ message: "Data not present" });
          res.status(200).json({ user });
    }
    else res.status(303).json({msg:"Something wrong"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const updatesignature = async (req, res) => {
  try {
    const user = req.body;
    const {userName}=req.params;
    // console.log(user);
     // Check if user data is empty
     if (!user || Object.keys(user).length === 0) {
      return res.status(400).json({ message: "User data is required." });
    }
    // handle file delete method
     const data=await signature.findOne({where:{userName:userName}});
      if(data){
        const deleteFile=data.path;
        console.log(deleteFile);
        fs.unlink(deleteFile, function (err) {
          if (err) throw err;
          console.log('File deleted!');
        });
        const updateUser = await signature.update(user, {
          where: { userName:userName },
        });
        if (updateUser) res.status(202).json({ message: "data updated" });
        else {
          res.status(303).json({ message: "data not update" });
        }
      }
    else{
      res.status(201).json({message:"user not found"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
