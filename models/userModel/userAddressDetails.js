import Sequelize from "sequelize";
import sequelize from "../../databaseConfig/db.js";
import UserPrimaryDetails from "./userPrimaryDetails.js";
const userAddressDetails = sequelize.define("userAddressDetails", {
    userName: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
      },
    currentArea: {
        type: Sequelize.STRING,
    },
    currentFlat: {
        type: Sequelize.STRING,
    },
    currentHouseNo: {
        type: Sequelize.STRING,
    },
    currentDistrict: {
        type: Sequelize.STRING,
    },
    currentState: {
        type: Sequelize.STRING,
    },
    currentPincode: {
        type: Sequelize.STRING,
    },
    permanentArea: {
        type: Sequelize.STRING,
    },
    permanentFlat: {
        type: Sequelize.STRING,
    },
    permanentHouseNo: {
        type: Sequelize.STRING,
    },
    permanentDistrict: {
        type: Sequelize.STRING,
    },
    permanentState: {
        type: Sequelize.STRING,
    },
    permanentPincode: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: false,
});

// Define association back to UserPrimaryDetails (One-to-One)
userAddressDetails.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});
export default userAddressDetails;
