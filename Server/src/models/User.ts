import { Model, Schema, Types, HydratedDocument, model } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import constants from "../utils/constants";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import AuthToken from "./AuthToken";
import crypto from "crypto";
import { sendEmailVerification } from '../services/mailgunService';
import { accountRegistrationEmailTemplate } from '../utils/email';

mongoose.set('strictQuery', false);

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  oldPasswords?: Types.Array<string>;
  accountType?: boolean;
  hashToken?: string;
}

interface IUserMethods {
  /** Compares password with the user's password
  */
  comparePassword(password: string): Promise<boolean>;
  /** Generates a JWT token for the user.
  */
  generateToken(): string;
  /** Checks to see if user is verified
  */
  verified(): Promise<boolean>;
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
    isVerified: { type: Boolean, required: true, default: false},
    oldPasswords: { type: Array },
    accountType: { type: Boolean },
    hashToken: { type: String, required: false},
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("email")) {
    return next();
  }
  if(this.isModified("email")) {    
    // send verification email
    const token = crypto.randomBytes(32).toString("hex");
    const hashToken = await bcrypt.hash(token, constants.bcrypt_log_rounds);

    this.hashToken = hashToken;
    this.isVerified = false;
    // send email to user on email change or new account
    await sendEmailVerification(this.email, token, this._id.toString(), this.firstName).catch((err) => {
      return next(err);
    });
    return next();
  }

});

UserSchema.pre("save", function (next) {
  // If password is not modified, save user as normal
  if (!this.isModified("password")) return next();
  if (this.isModified("password")) {
    // If password is modified, save its hash
    bcrypt.genSalt(constants.bcrypt_log_rounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);

        this.password = hash;

        return next();
      });
    });
  }
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

UserSchema.methods.verified = async function () {
  return this.isVerified;
}

// Statics

const User = model<IUser, UserModel>("users", UserSchema);

export default User;
