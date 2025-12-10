import { Employee } from "./employee"


export type Company = {
  id: number;
  name: string;
  industry: string;
  active: boolean;
  website: string;
  telephone: string;
  slogan: string;
  address: string;
  city: string;
  country: string;
};


export type CompanyWithEmployees = Company & {
  employees: Employee[];
};