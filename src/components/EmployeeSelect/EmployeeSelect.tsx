import React, { useState, useEffect } from "react";
import { Employee } from "../../types";
import { getEmployees } from "../../services/apiService";

interface EmployeeSelectProps {
  onChange: (employee: Employee) => void;
}

export const EmployeeSelect: React.FC<EmployeeSelectProps> = ({ onChange }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmployee = employees.find(
      (employee) => employee.id === Number(event.target.value)
    );
    if (selectedEmployee) {
      onChange(selectedEmployee);
    }
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select Employee</option>
      {employees.map((employee) => (
        <option key={employee.id} value={employee.id}>
          {employee.firstName} {employee?.middleName} {employee.lastName}
        </option>
      ))}
    </select>
  );
};
