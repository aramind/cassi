export const joinWithSymbol = (arr, symbol = "/") => {
  if (!Array.isArray(arr)) return arr;

  return arr.join(symbol);
};
