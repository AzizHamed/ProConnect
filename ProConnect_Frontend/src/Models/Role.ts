export type Role = {
    id: number;
    name: string;
    code: string;
  };
  
  // Static instances
const ADMIN: Role = { id: 0, name: "Admin", code: "ADM" };
const HOMEOWNER: Role = { id: 1, name: "Homeowner", code: "HO" };
const PROFESSIONAL: Role = { id: 2, name: "Professional", code: "PRO" };
const CONTRACTOR: Role = { id: 3, name: "Contractor", code: "CON" };
const WORKER: Role = { id: 4, name: "Worker", code: "WOR" };

export const roles: Role[] = [ADMIN, HOMEOWNER, PROFESSIONAL, CONTRACTOR, WORKER];