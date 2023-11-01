import { Model, Schema, Types, HydratedDocument, model } from "mongoose";
import constants from "../utils/constants";
import jwt from "jsonwebtoken";

interface IAuthToken {
  user: Types.ObjectId;
  revoked: boolean;
  createdAt: Date;
  jti: string;
}

interface IAuthTokenMethods {
  revoke(): Promise<void>;
}

interface AuthTokenModel extends Model<IAuthToken, {}, IAuthTokenMethods> {
  registerAuthToken(token: string): Promise<HydratedDocument<IAuthToken, IAuthTokenMethods>>;
}

const AuthTokenSchema = new Schema<IAuthToken, AuthTokenModel, IAuthTokenMethods>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: constants.token_expires_in
  },
  revoked: {
    type: Boolean,
    required: true,
    default: false
  },
  jti: {
    type: String,
    required: true,
    unique: true
  },
});

// Methods

AuthTokenSchema.methods.revoke = async function () {
  this.revoked = true;
  this.save();
};

// Statics

AuthTokenSchema.static("registerAuthToken", async function (token: string) {
  const tokenData = jwt.decode(token, { json: true });
  if (!tokenData) return;
  const { jti, iat, sub } = tokenData;
  return this.create({
    jti,
    createdAt: new Date(iat! * 1000),
    user: sub!
  });
});

const AuthToken = model<IAuthToken, AuthTokenModel>("authtokens", AuthTokenSchema);

export default AuthToken;
