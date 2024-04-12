import Sequelize from "sequelize";
import sequelize from "../../databaseConfig/db.js";

const SignIn = sequelize.define("SignIn", {
  emailId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobileNo:{
    type:Sequelize.BIGINT,
    allowNull:false,
    unique:true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isVerifiedMobile:{
    type:Sequelize.BOOLEAN,
    default:false,
  },
  isVerifiedEmail:{
    type:Sequelize.BOOLEAN,
    default:false,
  }
});

export default SignIn;
