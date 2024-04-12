import Sequelize from "../../databaseConfig/db.js";
import sequelize  from "sequelize";
import UserPrimaryDetails from "../userModel/userPrimaryDetails.js";

const previousExperience = Sequelize.define('previousExperience', {
    
    userName: {
        type: sequelize.STRING,
        allowNull:false,
      },
      fileName:{
        type: sequelize.STRING,
        allowNull:false,
      },
      path: {
        type: sequelize.STRING,
        allowNull:false,
      },
  },{timestamps:false});
  
  // Define association back to UserPrimaryDetails (One-to-One)
  previousExperience.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});
  export default previousExperience;