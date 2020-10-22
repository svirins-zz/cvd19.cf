export const sortOptions = (order: boolean) => ({
  defaultSortOrder: order ? 'acsend' : 'descend',
  sortDirections: ['ascend', 'descend'],
});
export const textSorter = (a, b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
  if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
  return 0;
};
