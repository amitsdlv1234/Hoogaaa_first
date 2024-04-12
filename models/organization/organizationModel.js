import Sequelize from "../../databaseConfig/db.js";
import sequelize  from "sequelize";
import UserPrimaryDetails from "../userModel/userPrimaryDetails.js";

const organization = Sequelize.define('organization', {
    
    userName: {
        type: sequelize.STRING,
        allowNull:false,
      },
      company: {
      type: sequelize.STRING,
      allowNull: false,
    },
    department: {
      type: sequelize.STRING,
      allowNull: false,
    },
    technology: {
      type: sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: sequelize.STRING,
      allowNull: false,
    },
    costCenter: {
      type: sequelize.STRING,
      allowNull: false,
    },
    legalEntity: {
      type: sequelize.STRING,
      allowNull: false,
    },
    dottedLineManager: {
      type: sequelize.STRING,
      defaultValue: '-Not Set-',
    },
    reportsTo: {
      type: sequelize.STRING,
      allowNull: false,
    },
    managerOfManager: {
      type: sequelize.STRING,
      defaultValue: '-Not Set-',
    },
    directReports: {
      type: sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },{timestamps:false});
  
  // Define association back to UserPrimaryDetails (One-to-One)
organization.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});
  export default organization;