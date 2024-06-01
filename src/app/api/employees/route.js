import { NextResponse } from "next/server";
const Employee = require("../../../config/models/EmployeeModel");

export async function POST(request) {
  try {
    const { name, email, salary } = await request.json(); // Parse JSON body

    const newEmployee = await Employee.create({
      emp_name: name,
      emp_email: email,
      emp_salary: salary,
    });

    return NextResponse.json({ newEmployee });
  } catch (error) {
    console.error("Error while creating employee:", error);
    return NextResponse.json(
      { error: "Error while creating employee" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const employees = await Employee.findAll();
    return NextResponse.json({ employees });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" });
  }
}


// export async function POST(request) {
//   try {
//     const data = await request.formData();
//     const name = data.get("emp_name");
//     const email = data.get("emp_email");
//     const salary = data.get("emp_salary");

//     const newEmployee = await Employee.create({
//       emp_name: name,
//       emp_email: email,
//       emp_salary: salary,
//     });
//     return NextResponse.json({ newEmployee });
//   } catch (error) {
//     return NextResponse.json({ error: "Error while creating employee" });
//   }
// }


// export async function DELETE(request) {
//   try {
//     const { id } = request.params;
//     const employee = await Employee.findByPk(id);
//     if (!employee) {
//       return NextResponse.json({ error: "Employee not found" });
//     }
//     await employee.destroy();
//     return NextResponse.json({ message: "Employee deleted successfully" });
//   } catch (error) {
//     return NextResponse.json({ error: "Error while deleting employee" });
//   }
// }
