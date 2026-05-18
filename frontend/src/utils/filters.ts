export const filterByQuery = <T extends Record<string, any>>(
  items: T[],
  query: string,
  fields: (keyof T)[]
) => {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(lowerQuery);
    })
  );
};
