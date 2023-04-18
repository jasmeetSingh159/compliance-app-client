import React, { useState, useEffect } from "react";
import { getCompanies } from "../../services/apiService";
import { Company } from "../../types";

interface Props {
  onChange: (selectedCompanyId: string) => void;
}

const CompanySelect: React.FC<Props> = ({ onChange }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompanyId(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select value={selectedCompanyId} onChange={handleChange}>
      <option value="">Select a company</option>
      {companies.map((company) => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </select>
  );
};

export default CompanySelect;
