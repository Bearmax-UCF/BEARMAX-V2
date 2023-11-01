import { Model, Schema, Types, HydratedDocument, model } from "mongoose";
import bcrypt from "bcrypt";
import constants from "../utils/constants";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import AuthToken from "./AuthToken";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  oldPasswords?: Types.Array<string>;
  accountType?: boolean;
}

interface IUserMethods {
  /** Compares password with the user's password
  */
  comparePassword(password: string): Promise<boolean>;
  /** Generates a JWT token for the user.
  */
  generateToken(): string;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
}

/*
registerUser(user: IUser): Promise<HydratedDocument<IUser, IUserMethods>>;
*/

declare global {
  namespace Express {
    interface User extends HydratedDocument<IUser, IUserMethods> {
    }
  }
}

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  oldPasswords: { type: Array },
  accountType: { type: Boolean },
});

UserSchema.pre("save", function (next) {
  // If password is not modified, save user as normal
  if (!this.isModified("password")) return next();

  // If password is modified, save its hash
  bcrypt.genSalt(constants.bcrypt_log_rounds, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;

      return next();
    });
  });
});

UserSchema.pre("deleteOne", function (next) {
  const user = this.getQuery()["_id"];

  AuthToken.deleteMany({ user }, (err) => {
    if (err) return next(err);
    next();
  });
});

// TODO: Delete other User specific db records!
// UserSchema.pre("remove", function (next) { });

// Methods

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      sub: this._id,
      jti: uuid(),
    },
    constants.secret_key,
    {
      expiresIn: constants.token_expires_in
    }
  );
  return token;
};

// Statics

const User = model<IUser, UserModel>("users", UserSchema);

export default User;
