import { format } from 'date-fns';

const formatDate = (ts) => {
  return format(new Date(ts), 'd.M.Y');
};

const formatDateWithTime = (ts) => {
  return format(new Date(ts), 'd.M.Y HH:mm:ss');
};

export { formatDate, formatDateWithTime };
