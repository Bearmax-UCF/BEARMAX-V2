import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import AuthToken from "../../models/AuthToken";
import User from "../../models/User";
import constants from "../../utils/constants";

const strategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.secret_key,
  },
  async ({sub, jti}, done) => {
    try {
      const user = await User.findById(sub);
      if (!user) {
        return done(null, false, {
          message: "Invalid token",
        });
      }

      const token = await AuthToken.findOne({ jti });

      if (!token) return done(null, false, { message: "Invalid token" });
      if (token.revoked) return done(null, false, { message: "Token Expired" });

      return done(null, user);

    } catch (err) {
      done(null, false, { message: err });
    }
  }
);

export default strategy;
