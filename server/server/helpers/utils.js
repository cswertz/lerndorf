import bCrypt from 'bcrypt-nodejs';
import md5 from 'md5';

const hashPassword = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
const comparePasswords = (pwd1, pwd2) => bCrypt.compareSync(pwd1, pwd2);
const hashString = string => md5(string);

export {
  hashString,
  hashPassword,
  comparePasswords,
};
