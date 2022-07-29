import Joi from 'joi';
import Auth from '../interfaces/auth.interface';
import connection from '../models/connection';
import LoginModel from '../models/login.model';
import JwtService from './jwt.service';

class LoginService {
  public model: LoginModel;

  public jwt: JwtService;

  constructor() {
    this.model = new LoginModel(connection);
    this.jwt = new JwtService();
  }

  validateBody = (auth: Auth) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(auth);

    if (error) {
      throw error;
    }
    return value;
  };

  authUser = async (auth: Auth) => {
    const user = await this.model.authUser(auth);
    if (user.id) {
      const token = this.jwt.create(user.id, user.username);
      return token;
    }
  };
}

export default LoginService;