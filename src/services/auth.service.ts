import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { QueryResult } from 'pg';
import pool from '../database';
import httpException from '../exception/httpException';
import { iUser } from '../interfaces/iUser';

class Auth {
  async logUser(body: iUser) {
    const userByEmail: QueryResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [body.email]
    );

    if (userByEmail.rowCount === 0) {
      throw new httpException(404, 'User! or password incorrect');
    }
    const resPass = userByEmail.rows[0].password;

    const isMatch = await bcrypt.compareSync(body.password, resPass);

    if (!isMatch) {
      throw new httpException(404, 'User or password! incorrect');
    }

    return userByEmail.rows[0];
  }
}

export default Auth;
