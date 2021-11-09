import { Pool } from 'pg';

export const pool = new Pool({
  user: 'vicflores11',
  host: 'localhost',
  password: 'root',
  database: 'coffee_shop',
  port: 5432,
});

export default pool;
