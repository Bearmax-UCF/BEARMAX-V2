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
              return done(null, user);
            }

            return done(null, false, {
              message: "Incorrect username or password.",
            });
          });
        }
      })
      .catch((err) => done(null, false, { message: err }));
  }
);

export default strategy;
