import Sequelize from "sequelize";
import sequelize from "../../databaseConfig/db.js";
import UserPrimaryDetails from "./userPrimaryDetails.js";
const UserContactDetails = sequelize.define("UserContactDetails", {
    userName: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
      },
    workEmail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  personalEmail:{
    type:Sequelize.STRING,
  },
  mobileNo: {
    type: Sequelize.BIGINT,
  },
  workPhone: {
    type: Sequelize.BIGINT,
  },
  residencePhone: {
    type: Sequelize.BIGINT,
  },
  skype: {
    type: Sequelize.STRING,
  },
},{
    timestamps: false, // Disable Sequelize's default timestamps
});
// Define association back to UserPrimaryDetails (One-to-One)
UserContactDetails.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName', // This is the foreign key in UserContactDetails
    targetKey: 'userName', // This is the primary key in UserPrimaryDetails
    as: 'primaryDetails', // Alias for the association
});
export default UserContactDetails;
