import Sequelize from "sequelize";
import sequelize from "../../databaseConfig/db.js";
import UserPrimaryDetails from "./userPrimaryDetails.js";
const UserAddressProof = sequelize.define("UserAddressProof", {
    userName: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
      },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idType: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    enrollmentNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    address:{
        type:Sequelize.STRING,
    },
    gender:{
        type:Sequelize.STRING
    }
}, {
    timestamps: false,
});
// Define association back to UserPrimaryDetails (One-to-One)
UserAddressProof.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});


export default UserAddressProof;
