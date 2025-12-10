import { loadCompaniesWithEmployees } from "../data/companyWithEmployeesLoader";
import type { CompaniesQuery } from "../utils/validation";
import { paginate } from "../utils/pagination";
const all = loadCompaniesWithEmployees();

export function getAllCompanies(query: CompaniesQuery) {
  let filtered = all;
  //filter by name if provided
  if (query.name) {
    const nameLower = query.name.toLowerCase();
    filtered = filtered.filter((company) =>
      company.name.toLowerCase().includes(nameLower)
    );
  }
  //filter by active status if provided
  if (typeof query.active === "boolean") {
    filtered = filtered.filter((company) => company.active === query.active);
  }
  if (query.employeeName) {
    const empNameLower = query.employeeName.toLowerCase();
    filtered = filtered.filter((company) =>
      company.employees.some((employee) => {
        const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
        return fullName.includes(empNameLower);
      })
    )}
  
  const { items: companies, total } = paginate(
    filtered,
    query.limit,
    query.offset
  );

  return { companies, total };
}

export function getCompanyById(id: number) {
  return all.find((company) => company.id === id) || null;
}
