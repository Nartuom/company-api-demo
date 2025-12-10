import { z } from "zod";

export const companiesQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10))
    .refine((val) => val > 0, { message: "Limit must be a positive number" })
    .pipe(z.number().max(100, { message: "Limit cannot exceed 100" })),
  offset: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 0))
    .refine((val) => val >= 0, { message: "Offset must be a non-negative number" })
    .pipe(z.number()),
  name: z
    .string()
    .optional()
    .transform((val) => (val?.trim() ? val.trim() : undefined)),          
  active: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const lower = val.toLowerCase();
        if (lower === "true") return true;
        if (lower === "false") return false;
      }
      return val;
    },
    z.boolean().optional()
  ),       
  employeeName: z
    .string()
    .optional()
    .transform((val) => (val?.trim() ? val.trim() : undefined)) 
});

export type CompaniesQuery = z.infer<typeof companiesQuerySchema>;