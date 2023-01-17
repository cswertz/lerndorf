const descendingComparator = (a, b, orderByAttr) => {
  if (b[orderByAttr] < a[orderByAttr]) {
    return -1;
  }
  if (b[orderByAttr] > a[orderByAttr]) {
    return 1;
  }
  return 0;
};
const stableSort = (array, comparator) => {
  const stabilizedThis = array
    .map((item) => {
      return item;
    })
    .map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const orderValue = comparator(a[0], b[0]);
    if (orderValue !== 0) {
      return orderValue;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
const getComparator = (orderDirection, orderByAttr) => {
  return orderDirection === 'desc'
    ? (a, b) => descendingComparator(a, b, orderByAttr)
    : (a, b) => -descendingComparator(a, b, orderByAttr);
};

export { descendingComparator, stableSort, getComparator };
