import { QueryResult } from 'pg';
import { pool } from '../database';
import bcrypt from 'bcrypt';
import { iUser } from '../interfaces/iUser';
import httpException from '../exception/httpException';

class Users {
  async getUsers() {
    const response: QueryResult = await pool.query('SELECT * FROM users');
    return response.rows;
  }

  async getUserById(id: string | (() => string) | undefined) {
    const response: QueryResult = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    if (response.rowCount === 0) {
      throw new httpException(404, 'User not found');
    }
    return response.rows;
  }

  async getUserByEmail(email: string) {
    const response: QueryResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return response;
  }

  async postUser(body: iUser) {
    const passHash = await bcrypt.hash(body.password, 10);
    const userByEmail = await this.getUserByEmail(body.email);

    if (userByEmail.rowCount === 1) {
      throw new httpException(400, 'User already exist');
    }

    await pool.query(
      'INSERT INTO users (name, password, email) VALUES ($1, $2, $3)',
      [body.name, passHash, body.email]
    );

    return 'User created';
  }

  async putUser(body: iUser, id: string) {
    await this.getUserById(id);
    await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
      body.name,
      body.email,
      id,
    ]);

    return 'User modified successfully';
  }

  async deleteUser(id: string) {
    await this.getUserById(id);
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return 'User removed successfully';
  }
}

export default Users;
