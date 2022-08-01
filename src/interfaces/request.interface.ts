import { JwtPayload } from 'jsonwebtoken';

interface Request {
  req: object
  id?: JwtPayload
  headers: {
    Authorization: string,
  },
  body: {
    username: string,
    password: string,
  }

}

export default Request;