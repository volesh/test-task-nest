import * as bcrypt from 'bcrypt';
export class PasswordHelper {
  async hashPass(password) {
    return bcrypt.hash(password, 10);
  }
  comparePas(userPass, hashedPass) {
    return bcrypt.compare(userPass, hashedPass);
  }
}
