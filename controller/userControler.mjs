import UserService from '../models/user/userService.mjs';
import { validationResult } from "express-validator";
import passport from "passport";

class UserController {
  static async getUserChoice(req, res) {
    try {
      res.render('login', {
        user: req.user,
        errors: [],
        messages: [],
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error showing User Form');
    }
  }

  static async userRegistr(req, res, next) {
    try {
      const errors = validationResult(req);
      const user = req.body;

      if (!errors.isEmpty()) {
        return res.render('login', {
          errors: errors.array(),
          user: user,
          messages: [],
        });
      }
      //-------------------Creat user------------------//
      const data = req.body;
      await UserService.create(data);

      //--------------Authenticate new User-------------------//
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          console.error('Authentication error:', err);
          return next(err);
        }
        if (!user) {
          console.error('Authentication failed:', info);
          return res.redirect('/login');
        }
        req.logIn(user, (err) => {
          if (err) {
            console.error('Login error:', err);
            return next(err);
          }
          console.log('User authenticated and logged in:', user);
          return res.redirect('/products');
        });
      })(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error during user registration');
    }
  }

  static async userLogin(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Authentication error:', err);
        return res.render('login', {
          errors: [err],
          user: req.body,
        });
      }
      if (!user) {
        // return res.redirect('/user');
          req.flash('error', info.message || 'Invalid credentials');
          return res.render('login', {
            user: req.body, 
            messages: req.flash('error'), 
            errors: [],
          });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/products');
      });
    })(req, res, next); 
  }

  static async userLogout(req, res) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/products');
    });
  }
}

export default UserController;
