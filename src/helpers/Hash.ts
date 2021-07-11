// @ts-ignore
import bcrypt from 'bcryptjs';

/** Hash Class */
class Hash {
  /**
   * @description - hash password method
   * @param {string} password
   * @return {string} hashed password
   */
  static hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * @description - this method compares password
   * @param {string} hashPassword
   * @param {string} password
   * @return {string} hashed password
   */
  static comparePassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }
}

export default Hash;
