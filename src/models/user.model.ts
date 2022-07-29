import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';

class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  create = async (user: User): Promise<number> => {
    const { username, classe, level, password } = user;

    const sql = `INSERT INTO Trybesmith.Users 
    (username, classe, level, password) VALUES (?, ?, ?, ?);`;
    const [{ insertId }] = await this.connection
      .query<ResultSetHeader>(sql, [username, classe, level, password]);
    return insertId;
  };
}

export default UserModel;