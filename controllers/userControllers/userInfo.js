// user profile related api's
import userPrimaryDetails from "../../models/userModel/userPrimaryDetails.js"

export const userPrimaryDetailsadd=async(req,res)=>{
try {
    const user=req.body;
    const {userName}=req.params;
    console.log("user data now ",user.length===0);
     // Check if user data is empty
     if (!user || Object.keys(user).length === 0) {
        return res.status(400).json({ message: "User data is required." });
      }
    const present=await userPrimaryDetails.findOne({where:{userName:userName}});
console.log(present)
    if(present) res.status(202).json({message:"userName is already register"});
    
    const newUser = await userPrimaryDetails.create({...user,userName:userName});
     
        res.status(200).json({newUser});
    
} catch (error) {
    console.log(error);
    res.status(500).json({message:"Server error",error})
}
}
// getting all users 
export const getAllUserPrimaryDetails=async(req,res)=>{
    try {
        const user=await userPrimaryDetails.findAll({});
        if(!user) res.status(201).json({message:"Data not present"})
        res.status(200).json({user});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error",error})
    }
    }
    export const getUserPrimaryDetails = async (req, res) => {
        try {
            const {userName}=req.params;
          const user = await userPrimaryDetails.findOne({
            where: { userName:userName },
          });
          if (!user) res.status(201).json({ message: "Data not present" });
          res.status(200).json({ user });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server error", error });
        }
      };
    export const updateUserPrimaryDetails=async(req,res)=>{
        try {

            const user=req.body;
            const {userName}=req.params;
    
    if(!userName) res.status(201).json({message:"userName field is required"})
     // Check if user data is empty
     if (!user || Object.keys(user).length === 0) {
        return res.status(400).json({ message: "User data is required." });
      }
    const present=await userPrimaryDetails.update(user,{where:{userName:userName}});
    if(present) res.status(202).json({message:"data updated"});  
        else{
            res.status(303).json({message:"data not update"});
        }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server error",error})
        }
        }   