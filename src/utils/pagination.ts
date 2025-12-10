export function paginate<T>(items: T[], limit: number, offset: number) {
  const total = items.length;

  if (total === 0) {
    return { total: 0, items: [] as T[] };
  }

  const start = Math.min(Math.max(offset, 0), total); 
  const end = Math.min(start + limit, total);

  return {
    total,
    items: items.slice(start, end)
  };
}
