import Sequelize from "sequelize";
import sequelize from "../../databaseConfig/db.js";
import UserPrimaryDetails from "./userPrimaryDetails.js";
const UserEducationalDetails = sequelize.define("UserEducationalDetails", {
    userName: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
      },
    tenthSchoolName: {
        type: Sequelize.STRING,
    },
    tenthPercentage: {
        type: Sequelize.FLOAT,
    },
    tenthPassingYear: {
        type: Sequelize.INTEGER,
    },
    twelfthSchoolName: {
        type: Sequelize.STRING,
    },
    twelfthPercentage: {
        type: Sequelize.FLOAT,
    },
    twelfthPassingYear: {
        type: Sequelize.INTEGER,
    },
    graduationCollegeName: {
        type: Sequelize.STRING,
    },
    graduationDegree: {
        type: Sequelize.STRING,
    },
    graduationPercentage: {
        type: Sequelize.FLOAT,
    },
    graduationPassingYear: {
        type: Sequelize.INTEGER,
    },
    experience:{
        type:Sequelize.INTEGER
    }
}, {
    timestamps: false,
});
// Define association back to UserPrimaryDetails (One-to-One)
UserEducationalDetails.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});
export default UserEducationalDetails;
