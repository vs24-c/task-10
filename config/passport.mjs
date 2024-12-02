import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user/UserModel.mjs';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'userName', 
      passwordField: 'password', 
    },
    async (userName, password, done) => {
      try {
        const user = await User.findOne({userName});
        if (!user) {
          return done(null, false, {message: 'Пользователь не найден'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, {message: 'Неверный пароль'});
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


passport.serializeUser((user, done) => {  
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return done(null, false, {message: 'User not found'});
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
