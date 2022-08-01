import dotenv from 'dotenv';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import PersonError from '../interfaces/error.interface';

dotenv.config();
const secret = 'olaolaola';

class JwtService {
  create = async (id: number, username: string) => {
    const token = sign({ id, username }, secret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  };

  validateToken = (token: string) => {
    try {
      const data = verify(token, secret);
      return data as JwtPayload;
    } catch (err) {
      const e = new PersonError(401);
      e.message = 'Invalid token';
      throw e;
    }
  };
}

export default JwtService;