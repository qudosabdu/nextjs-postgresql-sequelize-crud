import Link from "next/link";
import EditBtn from "./buttons/EditBtn";
import RemoveBtn from "./buttons/RemoveBtn";

const getEmployees = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/employees", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    // Assuming the employee data is under a key called 'employees'
    return data.employees || [];
  } catch (error) {
    console.log("Error loading employees:", error);
    return []; // Return an empty array in case of an error
  }
};

async function EmployeesList() {
  const employees = await getEmployees();
  // console.log(employees);

  return (
    <>
      {Array.isArray(employees) && employees.length > 0 ? (
        employees.map((e) => (
          <div
            key={e.id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-1xl">{e.emp_name}</h2>
              <div>{e.emp_email}</div>
              <div>{e.emp_salary}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={e.id} />
              <Link href={`/editEmployee/${e.id}`}>
                <EditBtn size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div>No employees found.</div>
      )}
    </>
  );
}

export default EmployeesList;
