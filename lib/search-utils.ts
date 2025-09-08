export function createSearchURL(
  query: string,
  updates: Record<string, string | undefined>,
  baseUrl = '/search'
) {
  const params = new URLSearchParams();
  params.set('query', query);

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) {
      params.set(key, value);
    }
  });

  return `${baseUrl}?${params.toString()}`;
}
