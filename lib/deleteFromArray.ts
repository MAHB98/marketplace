export const deleteFromArray = (
  array: any[] | null,
  thing: any,
  method: string
) => {
  if (array) {
    const find = array.findIndex((ar) => ar[method] == thing);

    const slice = array.slice(0, find);

    const reslice = array.slice(find + 1);

    const concat = slice.concat(reslice);

    return concat;
  } else return null;
};
