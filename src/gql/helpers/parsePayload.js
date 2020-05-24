export const parsePayload = (name) => (payload) =>
  payload.data?.[name].items || payload.data?.[name];
