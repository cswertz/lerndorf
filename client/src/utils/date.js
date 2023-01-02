import { format } from 'date-fns';

const formatDate = (ts) => {
  return format(new Date(ts), 'dd.MM.Y');
};

const formatDateWithTime = (ts) => {
  return format(new Date(ts), 'dd.MM.Y HH:mm:ss');
};

export { formatDate, formatDateWithTime };
