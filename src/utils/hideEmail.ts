export const hideEmail = (email?: string) => {
  const partialEmail = email?.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1•••••@$2");
  return partialEmail;
};
