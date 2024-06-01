import EditEmployeeForm from "@/app/components/EditEmployeeForm";

// const getEmployeeById = async (id) => {
//   try {
//     const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch topic");
//     }

//     return response.json();
//   } catch (error) {
//     console.log("Error loading topic", error);
//   }
// };

const getEmployeeById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch employee");
    }

    const data = await response.json();
    const employee = {
      name: data.emp_name,
      email: data.emp_email,
      salary: data.emp_salary,
    };

    return employee;
  } catch (error) {
    console.error("Error loading employee:", error);
    throw error;
  }
};
async function EditEmployee({ params }) {
  // Extract the id from params
  const { id } = params;

  const employee = await getEmployeeById(id);

  const { name, email, salary } = employee;

  console.log("Parsed data:", { name, email, salary });
  return <EditEmployeeForm name={name} email={email} salary={salary} id={id} />;
}

export default EditEmployee;
