export const hideEmail = (email?: string) => {
  if (email && email.split("@")[0].length <= 3) return email?.replace(/(\w{1})[\w.-]+@([\w.]+\w)/, "$1•••••@$2");
  const partialEmail = email?.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1•••••@$2");
  return partialEmail;
};
