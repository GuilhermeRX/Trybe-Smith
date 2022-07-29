import { Pool } from 'mysql2/promise';
import Auth from '../interfaces/auth.interface';
import User from '../interfaces/user.interface';

class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  authUser = async (auth: Auth): Promise<User> => {
    const { username, password } = auth;
    const sql = 'SELECT * FROM Trybesmith.Users WHERE username = ?';
    const [user] = await this.connection.query(sql, [username]);
    const [myUser] = user as User[];
    if (!myUser || myUser.password !== password) throw new Error('Username or password invalid');
    return myUser as User;
  };
}

export default LoginModel;