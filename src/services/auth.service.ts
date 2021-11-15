import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import pool from '../database';
import httpException from '../exception/httpException';
import { iUser } from '../interfaces/iUser';
import Users from './user.service';

const userService = new Users();

class Auth {
  async logUser(body: iUser) {
    const userByEmail = await userService.getUserByEmail(body.email);

    if (userByEmail.rowCount === 0)
      throw new httpException(404, 'User! or password incorrect');

    const { password, id } = userByEmail.rows[0];

    const isMatch = await bcrypt.compare(body.password, password);

    if (!isMatch) throw new httpException(404, 'User or password! incorrect');

    const payload = {
      sub: id,
    };

    const token: string = jwt.sign(payload, process.env.TOKEN_SECRET || '', {
      expiresIn: '1h',
    });

    return {
      user: userByEmail.rows,
      token,
    };
  }

  async sendMail(infoEmail: Object) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.HOST_EMAIL_USER,
        pass: process.env.HOST_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail(infoEmail);

    return { message: 'Email sent' };
  }

  async resetPassword(userEmail: string) {
    const userByEmail = await userService.getUserByEmail(userEmail);
    if (userByEmail.rowCount === 0)
      throw new httpException(404, 'User incorrect');

    const { id, email } = userByEmail.rows[0];
    const payload = { sub: id };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET_EMAIL || '', {
      expiresIn: '15min',
    });

    const link = `http://myfrontend/recovery?token=${token}`;

    await pool.query('UPDATE users SET token = $1 WHERE id = $2', [token, id]);

    const mail = {
      from: 'vicsito2014@gmail.com',
      to: `${email}`,
      subject: 'Email for recovery password',
      html: `<b>Link for recovery your password => ${link} </b>`,
    };

    const resSendEmail = await this.sendMail(mail);

    return resSendEmail;
  }

  async changePassword(userToken: string, newPassword: string) {
    const payload = jwt.verify(userToken, process.env.TOKEN_SECRET_EMAIL || '');
    const user = await userService.getUserById(payload.sub);

    const { token, id } = user[0];

    if (token !== userToken) {
      throw new httpException(401, 'Unauthorized');
    }

    const hashPass = await bcrypt.hash(newPassword, 10);

    await pool.query(
      'UPDATE users SET token = null, password = $1 WHERE id = $2',
      [hashPass, id]
    );

    return { message: 'Password changed' };
  }
}

export default Auth;
