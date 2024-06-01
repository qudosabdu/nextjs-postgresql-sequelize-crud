"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


function EditEmployeeForm({ name, email, salary, id}) {
  const router = useRouter();
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newSalary, setNewSalary] = useState(salary);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          salary: newSalary,
        }),

      });

      if(!response.ok) {
        throw new Error("Error updating the topic")
      }
      alert("Employee updated successfully");
      router.push("/");
    } catch (error) {
      console.log("Error updating the topic", error);
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Enter Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="email"
        className="border border-slate-500 px-8 py-2"
        placeholder="Enter Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <input
        type="number"
        className="border border-slate-500 px-8 py-2"
        placeholder="Enter Salary"
        value={newSalary}
        onChange={(e) => setNewSalary(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded w-fit">
        Update Employee
      </button>
    </form>
  );
}

export default EditEmployeeForm;
