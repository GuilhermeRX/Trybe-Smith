import Joi from 'joi';
import PersonError from '../interfaces/error.interface';
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

  validateBody = (user: User) => {
    const schema = Joi.object({
      username: Joi.string().required().min(3),
      classe: Joi.string().required().min(3),
      level: Joi.number().required().min(1),
      password: Joi.string().required().min(8),
    });

    const { error, value } = schema.validate(user);

    if (error) {
      const myError = new PersonError(422);
      myError.message = error.message;
      throw myError;
    }
    return value;
  };

  create = async (user: User): Promise<string> => {
    const id = await this.model.create(user);
    const token = await this.jwt.create(id, user.username);
    return token;
  };
}

export default UserService;