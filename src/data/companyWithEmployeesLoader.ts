import type { Company, CompanyWithEmployees } from "../models/company";
import type { Employee } from "../models/employee";
import { loadCompaniesJson } from "./companyLoader";
import { loadEmployeesJson } from "./employeeLoader";

export function loadCompaniesWithEmployees(): CompanyWithEmployees[] {
  const companies = loadCompaniesJson();
  const employees = loadEmployeesJson();

  // group employees by company_id
  const employeesByCompany = new Map<number, Employee[]>();

  for (const emp of employees) {
    if (emp.company_id == null) continue; 

    const list = employeesByCompany.get(emp.company_id) ?? [];
    list.push(emp);
    employeesByCompany.set(emp.company_id, list);
  }

  // attach employees to companies
  return companies.map((company) => ({
    ...company,
    employees: employeesByCompany.get(company.id) ?? [],
  }));
}