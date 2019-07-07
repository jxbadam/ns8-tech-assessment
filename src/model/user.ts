import { Created } from "../lib/model/created";

export class User extends Created {
  private email: string;
  private password: string;
  private phoneNumber: string;

  public constructor(email: string, password: string, phoneNumber?: string) {
    super();
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }
}
