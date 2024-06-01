"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !salary) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, salary }),
      });
      if (res.ok) {
        alert("Employee added successfully");
        router.refresh();
        router.push("/");
      } else {
        alert("Something went wrong!");
      }
      setName("");
      setEmail("");
      setSalary("");
    } catch (error) {
      console.error("Error while creating employee:", error);
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="border border-slate-500 px-8 py-2"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        className="border border-slate-500 px-8 py-2"
        placeholder="Enter Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-fit"
      >
        Add Employee
      </button>
    </form>
  );
}

export default page;
