import { QueryResult } from 'pg';
import { pool } from '../database';
import { iUser } from '../interfaces/iUser';

class Users {
  async getUsers() {
    const response: QueryResult = await pool.query('SELECT * FROM users');
    return response.rows;
  }

  async getUserById(id: string) {
    const response: QueryResult = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    if (response.rowCount === 0) {
      throw new Error('User not found');
    }
    return response.rows;
  }

  async postUser(body: iUser) {
    await pool.query(
      'INSERT INTO users (name, password, email) VALUES ($1, $2, $3)',
      [body.name, body.password, body.email]
    );
    return 'User created successfully';
  }

  async putUser(body: iUser, id: string) {
    await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
      body.name,
      body.email,
      id,
    ]);
    return 'User modified successfully';
  }

  async deleteUser(id: string) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return 'User removed successfully';
  }
}

export default Users;
