import Sequelize from "../../databaseConfig/db.js";
import sequelize  from "sequelize";
import UserPrimaryDetails from "../userModel/userPrimaryDetails.js";

const assignAssets = Sequelize.define('assignAssets', {
    
    userName: {
        type: sequelize.STRING,
        allowNull:false,
      },
      assetType: {
        type: sequelize.STRING,
        allowNull: false,
      },
      assetName: {
        type: sequelize.STRING,
        allowNull: false,
      },
      assetId: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      assetCategory: {
        type: sequelize.STRING,
        allowNull: false,
      },
      assignedOn: {
        type: sequelize.DATEONLY,
        allowNull: false,
      },
      acknowledgementStatus: {
        type: sequelize.ENUM('Acknowledged', 'Not Acknowledged'),
        allowNull: false,
        defaultValue: 'Not Acknowledged',
      },
      currentCondition: {
        type: sequelize.STRING,
        allowNull: false,
      },
      actions: {
        type: sequelize.STRING,
        allowNull: false,
      },
  },{timestamps:false});
  
  // Define association back to UserPrimaryDetails (One-to-One)
  assignAssets.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});
  export default assignAssets;