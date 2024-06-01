"use client"
import { HiTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

function Remove({id}) {
  const router = useRouter();

  const handleRemove = async () => {
    const confirmed = confirm("Are you sure you want to delete this employee?");
    if (confirmed) {
      try {
        const response = await fetch(`/api/employees/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          alert("Employee deleted successfully");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        router.refresh();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  }
  return (
    <div>
    <button onClick={handleRemove} className="text-red-400">
      <HiTrash size={24} />
    </button>
  </div>
  )
}

export default Remove
