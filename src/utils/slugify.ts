const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");

export const getIdFromSlug = (slug: string) => {
  const arr = slug.split("-");
  const onlyIdArr = arr.slice(arr.length - 5, arr.length);
  return onlyIdArr.join("-");
};

export const getFirstSegmentFromSlug = (slug: string) => {
  const arr = slug.split("-");
  const onlyIdArr = arr.slice(0, 1);
  return onlyIdArr.join("-");
};

export const generateSlug = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-${id}`;
};
