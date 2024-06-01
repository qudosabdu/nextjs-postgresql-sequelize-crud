// /pages/api/employees/[id].js
import { NextResponse } from "next/server";
const Employee = require("../../../../config/models/EmployeeModel");

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }
    await employee.destroy();

    return NextResponse.json({
      message: `Employee with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error while deleting employee:", error);
    return NextResponse.json(
      { error: "Error while deleting employee" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Read and log the raw request body
    const rawBody = await request.text();
    console.log("Raw request body:", rawBody);

    // Parse the JSON from the raw body
    const { name, email, salary } = JSON.parse(rawBody);
    console.log("Parsed data:", { name, email, salary });

    // Validate the request payload
    if (!name || !email || !salary) {
      return NextResponse.json(
        { error: "Name, email, and salary are required" },
        { status: 400 }
      );
    }

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    employee.emp_name = name;
    employee.emp_email = email;
    employee.emp_salary = salary;
    await employee.save();

    return NextResponse.json({
      message: `Employee with id ${id} updated successfully`,
    });
  } catch (error) {
    console.error("Error while updating employee:", error);
    return NextResponse.json(
      { error: `Error while updating employee: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  try {
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Error while fetching employee:", error);
    return NextResponse.json(
      { error: "Error while fetching employee" },
      { status: 500 }
    );
  }
}
