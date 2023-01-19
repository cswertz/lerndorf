const paths = [
  '',
  'dashboard',
  'tasks',
  'messages',
  'languages',
  'taxonomies',
  'users',
  'logs',
  'threads',
  'errors',
];

const isDashboardNavCheck = (location) => {
  return paths.some((pathName) => location.pathname.includes(pathName));
};

export default isDashboardNavCheck;
