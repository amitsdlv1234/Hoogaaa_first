import Sequelize from "../../databaseConfig/db.js";
import sequelize  from "sequelize";
import UserPrimaryDetails from "../userModel/userPrimaryDetails.js";

const replacementRequest = Sequelize.define('replacementRequest', {
    
    userName: {
        type: sequelize.STRING,
        allowNull:false,
      },
      whichAsset: {
        type: sequelize.STRING,
        allowNull: false,
      },
  },{timestamps:false});
  
  // Define association back to UserPrimaryDetails (One-to-One)
  replacementRequest.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});
  export default replacementRequest;