import User from '../interfaces/user.interface';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import JwtService from './jwt.service';

class UserService {
  public model: UserModel;

  public jwt: JwtService;

  constructor() {
    this.model = new UserModel(connection);
    this.jwt = new JwtService();
  }

  create = async (user: User): Promise<string> => {
    const id = await this.model.create(user);
    const token = await this.jwt.create(id, user.username);
    return token;
  };
}

export default UserService;