import bCrypt from 'bcrypt-nodejs';

const hashPassword = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
const comparePasswords = (pwd1, pwd2) => bCrypt.compareSync(pwd1, pwd2);

export {
  hashPassword,
  comparePasswords,
};
