const paths = [
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
  if (location.pathname === '/') {
    return true;
  }
  return paths.some((pathName) => {
    const isDashboardRoute = location.pathname.includes(pathName);
    return isDashboardRoute;
  });
};

export default isDashboardNavCheck;
