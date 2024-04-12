import Sequelize from "../../databaseConfig/db.js";
import sequelize  from "sequelize";
import UserPrimaryDetails from "../userModel/userPrimaryDetails.js";

const Employee = Sequelize.define('Employee', {
    userName: {
        type: sequelize.STRING,
        unique:true,
        allowNull:false,
      },
    employeeNumber: {
      type: sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    dateOfJoining: {
      type: sequelize.DATEONLY,
      allowNull: false,
    },
    jobTitlePrimary: {
      type: sequelize.STRING,
      allowNull: false,
    },
    jobTitleSecondary: {
      type: sequelize.STRING,
    },
    inProbation: {
      type: sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Assuming Yes means true
    },
    noticePeriod: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    workerType: {
      type: sequelize.ENUM('Permanent', 'Contract', 'Temporary'),
      allowNull: false,
    },
    timeType: {
      type: sequelize.ENUM('Full Time', 'Part Time'),
      allowNull: false,
    },
    contractStatus: {
      type: sequelize.ENUM('Not Applicable', 'Active', 'Expired'),
      allowNull: false,
    },
    payGrade: {
      type: sequelize.STRING,
    },
    payBand: {
      type: sequelize.STRING,
    },
  },{
    timestamps:false
  });
  
  // Define association back to UserPrimaryDetails (One-to-One)
Employee.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});
  export default Employee;