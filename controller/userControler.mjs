import UserService from '../models/user/userService.mjs';
import { validationResult } from "express-validator";

class UserController {
  static async getUserChoice(req, res) {
    try {
      res.render('login', {
        user: req.user,
        errors: []
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error showing User Form');
    }
  }

  static async userRegistr(req, res) {     
    try {
      const errors = validationResult(req)      
      const user = req.body
      if (!errors.isEmpty()) {
        // if (req.user.id) user.id = req.params.id;
        return res.render('login', {
          errors: errors.array(),
          user: user,
        });
      }

      const data = req.body;
      await UserService.create(data); 
      res.redirect('/products');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error during user registration');
    }
  }
}

export default UserController;
