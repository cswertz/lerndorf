import { getNames } from 'country-list';

const hasCapability = (available, needed) => {
  for (let i = 0; i < available.length; i += 1) {
    const current = available[i];
    if (needed.indexOf(current) > -1) {
      return true;
    }
  }
  return false;
};

const isValidEmail = (string) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(string);
const isValidUrl = (string) =>
  !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(
    string,
  );

const getCountries = () => {
  return getNames();
};

export { hasCapability, isValidEmail, isValidUrl, getCountries };
