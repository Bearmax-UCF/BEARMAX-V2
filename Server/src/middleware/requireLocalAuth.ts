import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const requireLocalAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(422).send(info);
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default requireLocalAuth;
