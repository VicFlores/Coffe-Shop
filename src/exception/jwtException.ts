import { JsonWebTokenError } from 'jsonwebtoken';

class jwtException extends JsonWebTokenError {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default jwtException;
