import dotenv from 'dotenv';
import { sign, verify } from 'jsonwebtoken';

dotenv.config();
const secret = 'olaolaola';

class JwtService {
  create = async (id: number) => {
    const token = sign({ id }, secret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  };

  validateToken = async (token: string) => {
    try {
      const data = verify(token, secret);
      return data;
    } catch (_err) {
      const e = new Error('Expired or invalid token');
      throw e;
    }
  };
}

export default JwtService;