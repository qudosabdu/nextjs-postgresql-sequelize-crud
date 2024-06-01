import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize";

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    emp_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emp_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emp_salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Employees", // This should match your PostgreSQL table name
  }
);


module.exports = Employee;