import { BaseDao } from "../lib/dao/base-dao";
import { User } from "../model/user";

export class UserDao extends BaseDao<User> {
  public static getInstance(): UserDao {
    if (this.singleton == null) {
      this.singleton = new UserDao();
    }
    return this.singleton;
  }

  private static singleton: UserDao;

  private currentUser: User;

  public setCurrentUser(user: User) {
    this.currentUser = user;
  }

  public getCurrentUserId(): number {
    const user = this.currentUser;
    if (user != null) {
      return user.getId();
    }
    return null;
  }

  public findByEmail(email: string): User {
    if (email == null) {
      return null;
    }

    email = email.toLowerCase();

    const db = this.getDb();
    let user = null;
    for (const current of db) {
      if (current.getEmail() === email) {
        user = current;
        break;
      }
    }

    return user;
  }
}
