import mongoose from 'mongoose';
import config from "../../config/default.mjs";

const {Schema} = mongoose;

const userSchem = new Schema(
  {
    user: {
      type: String,
      required: [false, 'Username is required'],
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [20, 'Username must be at most 20 characters long'],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      // minlength: [6, 'Password must be at least 6 characters long'],
      // maxlength: [16, 'Password must be at most 16 characters long'],
      // validate: {
      //   validator: function (v) {
      //     return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v)
      //   },
      //   message: (props) =>
      //     'Password must contain at least one letter, one number, and one special character',
      // },
    },
    userName: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      // lowercase: true,
      // trim: true,
    },
  },
  {collection: 'user'}
);

// Статические методы для проверки базы данных и коллекции
userSchem.statics.checkExistDb = async function () {
  const database = await mongoose.connection.listDatabases();
  return database.databases.some((db) => db.name === config.databaseName);
};

userSchem.statics.checkExistCollection = async function () {
  if (!(await this.checkExistDb())) {
    console.log(`Database ${config.databaseName} does not exist`);
    return false;
  }
  const collections = await mongoose.connection.db.listCollections({ name: 'user' }).toArray();
  if (collections.length === 0) {
    console.log(`Collection '${collections.name}' does not exist`);
    return false;
  } else {
    console.log(`Collection '${collections.name}' exists`);
    return true;
  }
};

const User = mongoose.model('User', userSchem);

export default User;
