import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { iUser } from '../interfaces/iUser';
import { iUserPass } from '../interfaces/iUserPass';
import User from '../services/user.service';

const service = new User();

class Auth {
  async logUser(body: iUser) {}
}

export default Auth;
