import Sequelize from "../../databaseConfig/db.js";
import sequelize  from "sequelize";
import UserPrimaryDetails from "../userModel/userPrimaryDetails.js";

const signature = Sequelize.define('signature', {
    
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
  signature.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});
  export default signature;