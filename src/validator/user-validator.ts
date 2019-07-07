import { IValidator } from "../lib/validator";
import { User } from "../model/user";

export class UserValidator implements IValidator<User> {
  public validate(user: User): string {
    if (user == null) {
      return "null_user";
    }

    const email = user.getEmail();

    if (email == null) {
      return "email_required";
    }

    if (email === "") {
      return "email_empty";
    }

    const simpleEmailRegex = /[a-z][\-a-z0-9]*@[a-z][a-z0-9]*\.[a-z][a-z]+/gi;
    if (!email.match(simpleEmailRegex)) {
      return "invalid_email";
    }

    const phone = user.getPhoneNumber();

    // valid
    if (phone == null) {
      return null;
    }

    const regex = /\d{3}-\d{3}-\d{4}/;

    if (!phone.match(regex)) {
      return "invalid_phone_format";
    }

    return null;
  }
}
