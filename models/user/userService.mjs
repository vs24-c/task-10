import User from './UserModel.mjs';
import bcrypt from 'bcrypt';

class UserService {
  static async create(data) {
    const {userName, password, user} = data;
       const existUser = await User.findOne({userName});
       if (existUser) {
         throw new Error('A user with this name already exists');
       }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ user, userName, password: hashedPassword });        
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error('Error during user registration:', error);
      throw new Error('Error registering user');
    }
  }
}

export default UserService;
