import type { FastifyReply, FastifyRequest } from "fastify";
import { companiesQuerySchema } from "../utils/validation";
import { getAllCompanies, getCompanyById } from "../services/companyService";

export async function getCompaniesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parseResult = companiesQuerySchema.safeParse(request.query);

  if (!parseResult.success) {
    return reply.status(400).send({
      error: "Invalid query parameters",
      details: parseResult.error.flatten()
    });
  }

  const query = parseResult.data; 

  const {companies, total} = getAllCompanies(query);

  return reply.send({
    data: companies,
    meta: {
      total,
      limit: query.limit,
      offset: query.offset
    }
  });
}

export async function getCompanyByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  if (Number.isNaN(id)) {
    return reply.status(400).send({ error: "Invalid company id" });
  }

  const company = getCompanyById(id);

  if (!company) {
    return reply.status(404).send({ error: "Company not found" });
  }

  return reply.send(company);
}
