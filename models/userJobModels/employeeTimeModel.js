import Sequelize from "../../databaseConfig/db.js";
import sequelize  from "sequelize";
import UserPrimaryDetails from "../userModel/userPrimaryDetails.js";

const employeeTime = Sequelize.define('employeeTime', {
    userName: {
        type: sequelize.STRING,
        unique:true,
        allowNull:false,
      },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    regular: {
      type: sequelize.STRING,
      allowNull: false,
    },
    weeklyOffPolicy: {
      type: sequelize.STRING,
      allowNull: false,
    },
    leavePlan: {
      type: sequelize.STRING,
      defaultValue: '-Not Set-',
    },
    holidayCalendar: {
      type: sequelize.STRING,
      defaultValue: 'Company Holiday Calendar',
    },
    attendanceNumber: {
      type: sequelize.STRING,
      allowNull: false,
    },
    disableAttendanceTracking: {
      type: sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    attendanceCaptureScheme: {
      type: sequelize.STRING,
      defaultValue: '-Not Set-',
    },
    attendanceTrackingPolicy: {
      type: sequelize.STRING,
      defaultValue: 'Company',
    },
    shiftWeeklyOffRule: {
      type: sequelize.STRING,
      defaultValue: '-Not Set-',
    },
    shiftAllowancePolicy: {
      type: sequelize.STRING,
      defaultValue: '-Not Set-',
    },
    overtime: {
      type: sequelize.STRING,
      defaultValue: '-Not Set-',
    },
  },{timestamps:false});
  
  // Define association back to UserPrimaryDetails (One-to-One)
employeeTime.belongsTo(UserPrimaryDetails, {
    foreignKey: 'userName',
    targetKey: 'userName',
    as: 'primaryDetails',
});
  export default employeeTime;