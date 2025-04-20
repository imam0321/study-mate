export const replaceMongoId = (data) => {
  if (!data) return data; // Handle null or undefined

  if (Array.isArray(data)) {
    return data.map(({ _id, ...rest }) => ({
      id: _id?.toString(),
      ...rest,
    }));
  }

  const { _id, ...rest } = data;
  return {
    id: _id?.toString(),
    ...rest,
  };
};
