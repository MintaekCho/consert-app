export const arrayToString = (arr: string[]) => {
  return arr.reduce((result, item, index) => {
    if (index === arr.length - 1) {
      return result + item;
    }
    return result + item + ", ";
  }, "");
};
