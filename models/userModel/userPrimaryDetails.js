import Sequelize from "sequelize";
import sequelize from "../../databaseConfig/db.js";

const UserPrimaryDetails = sequelize.define("UserPrimaryDetails", {
    userName: {
        type: Sequelize.STRING,
        unique:true,
        primaryKey:true,
        allowNull:false,
      },
    firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  middleName:{
    type:Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY,
  },
  maritalStatus: {
    type: Sequelize.STRING,
  },
  bloodGroup:{
    type:Sequelize.STRING,
  },
  physicallyHandicapped: {
    type: Sequelize.BOOLEAN,
  },
  nationality: {
    type: Sequelize.STRING,
  },
},{
    timestamps: false, // Disable Sequelize's default timestamps
});

export default UserPrimaryDetails;
