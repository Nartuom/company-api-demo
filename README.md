# Basic Company API

Fastify + TypeScript service that exposes company and employee data from local JSON files with filtering, validation, and pagination.

## Prerequisites
- Node.js 18 or later  
  (This project was built and tested using Node 22)
- npm

## Setup
1) Install dependencies:
   ```bash
   npm install
   ```
2) Configure data paths (defaults already provided):
   - Copy/inspect `.env`:
     ```
     COMPANIES_DATA_PATH=./data/companies
     EMPLOYEES_DATA_PATH=./data/employees
     ```
   - Point these to your JSON directories if you move the data.

## Run
- Dev:
  ```bash
  npm run dev
  ```
- Tests (Jest + ts-jest):
  ```bash
  npm test
  ```

## API
Base URL: `http://localhost:3000`

### GET /companies
Returns companies with nested employees plus pagination metadata.
Query params (all optional):
- `limit` (number, default 10, max 100)
- `offset` (number, default 0)
- `name` (partial match, case-insensitive)
- `active` (`true` | `false`)
- `employeeName` (partial match on employee full name)

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Example Co",
      "industry": "Tech",
      "active": true,
      "website": "https://example.com",
      "telephone": "123-456-7890",
      "slogan": "...",
      "address": "...",
      "city": "...",
      "country": "...",
      "employees": [
        {
          "id": 10,
          "first_name": "Jane",
          "last_name": "Doe",
          "email": "jane@example.com",
          "role": "Engineer",
          "company_id": 1
        }
      ]
    }
  ],
  "meta": { "total": 4, "limit": 10, "offset": 0 }
}
```

Errors:
- 400 on invalid query params (Zod validation)
- 500 if data paths are misconfigured

### GET /companies/:id
Returns a single company with its employees.
- 400 on non-numeric id
- 404 if not found

## Implementation Notes
- Data loading: `src/data/jsonLoader.ts` reads all JSON files in a directory, 
  skipping invalid files. This is used by `companyLoader.ts` and 
  `employeeLoader.ts` to load their respective datasets.
- Aggregation: `src/data/companyWithEmployeesLoader.ts` joins companies and employees in-memory.
- Validation: `src/utils/validation.ts` (Zod) applies defaults and sanitizes filters.
- Pagination: `src/utils/pagination.ts` slices results and returns `total`.
- Handlers: `src/controller/companyController.ts`
- Service layer: `src/services/companyService.ts`

## Project Structure
- App/router -> Controller -> Service -> Data Loaders -> Data Files
- `src/` – app, controllers, services, models, utils, data loaders
- `data/` – sample company/employee JSON files and schemas
- `tests/` – unit tests for validation and pagination

## Architecture Overview

```mermaid
flowchart TD

Client[HTTP Client\n(Browser)] --> Fastify[Fastify Router]

Fastify --> Controller[Controller\n(Parses query, calls service)]
Controller --> Service[Service Layer\n(Filter, paginate, business logic)]
Service --> Repo[Repository\n(In-memory joined data)]
Repo --> Loader[JSON Loaders\n(Safe parse, skip invalid)]
Loader --> Files[Data Files\ncompanies/*.json\nemployees/*.json]
```

## Notes for Production
- Replace file-based data with a database or external service.

