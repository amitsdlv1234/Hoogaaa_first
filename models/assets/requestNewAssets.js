import Sequelize from "../../databaseConfig/db.js";
import sequelize  from "sequelize";
import UserPrimaryDetails from "../userModel/userPrimaryDetails.js";

const requestNewAssets = Sequelize.define('requestNewAssets', {
    
    userName: {
        type: sequelize.STRING,
        allowNull:false,
      },
      whichAsset: {
        type: sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: sequelize.TEXT,
        allowNull: false,
      },
  },{timestamps:false});
  
  // Define association back to UserPrimaryDetails (One-to-One)
  requestNewAssets.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});
  export default requestNewAssets;