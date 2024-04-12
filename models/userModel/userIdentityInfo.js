import Sequelize from "sequelize";
import sequelize from "../../databaseConfig/db.js";
import UserPrimaryDetails from "./userPrimaryDetails.js";
const UserIdentityInfo = sequelize.define("UserIdentityInfo", {
    userName: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
      },
    idType: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Assuming initially not verified
    },
    idNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    parentsName: {
        type: Sequelize.STRING,
        allowNull: true, // Parent's name might be optional
    },
}, {
    timestamps: false,
});
// Define association back to UserPrimaryDetails (One-to-One)
UserIdentityInfo.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});

export default UserIdentityInfo;
