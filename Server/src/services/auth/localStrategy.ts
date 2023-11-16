import { Strategy as LocalStrategy } from "passport-local";
import User from "../../models/User";

const strategy = new LocalStrategy(
  { usernameField: "email", session: false },
  (email, password, done) => {
    // Match User
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        } else {
          user.comparePassword(password).then((isMatch) => {
            if (isMatch) {
              user.verified().then((isVerified) => {
                if (!isVerified) {
                  return done(null, false, {
                    message: "Account not verified.",
                  });
                } else {
                  return done(null, user);
                }
              });
            } else {
              return done(null, false, {
                message: "Incorrect username or password.",
              });
            }
          });
        }
      })
      .catch((err) => done(null, false, { message: err }));
  }
);

export default strategy;
