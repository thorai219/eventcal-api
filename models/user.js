const db = require("../db");
const bcrypt = require("bcrypt");
const partialUpdate = require("../helpers/partialUpdate");

const BCRYPT_WORK_FACTOR = 10;

class User {
  // authenticate with username, password. returns user or throws error.
  static async authenticate(data) {
    // find the user first
    const result = db.query(
      `SELECT username, email, password, full_name, zip_code, interests from user where username = $1`,
      [data.username]
    );

    const user = result.rows[0];

    if (user) {
      // compare password with hashed password
      const isValid = await bcrypt.compare(data.password, user.password);
      // if they match return the user
      if (isValid) {
        return user;
      }
    }
    // if password doesn't match throw error
    const invalidPasword = new Error("Invalid Password");
    invalidPasword.status = 401;
    throw invalidPasword;
  }

  static async register(data) {
    // check if there is duplicate in database
    const duplicateCheck = await db.query(
      `SELECT username, email FROM user WHERE username = $1`,
      [data.username]
    );
    // check if username or email is a duplicate
    if (duplicateCheck.rows[0]) {
      const err;
      if (duplicateCheck.rows[0].email === data.email) {
        err = new Error("You already have an account with us!");
      }
      if (duplicateCheck.rows[0].username === data.username) {
        err = new Error("Username already exists, Please pick another");
      }
      err.status = 409;
      throw err;
    }
    // hash password
    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    // Insert into database
    const result = await db.query(
      `INSERT INTO users (username, password, email, full_name, zip_code, interests)
        VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING username, email, full_name, zip_code, interests`,
      [
        data.username,
        data.password,
        data.email,
        data.full_name,
        data.zip_code,
        data.interests,
      ]
    );

    return result.rows[0];
  }

  static async findFriends(user) {
    // find user's friends
    const result = await db.query(
      `SELECT user2_id FROM friends WHERE user1_id = $1`,
      [user.id]
    );

    return result.rows;
  }

  static async findOne(username) {
    // search for a user with username
    const result = await db.query(
      `SELECT username, email, full_name, interests FROM users WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];
    // if no user throw error
    if (!user) {
      const err = new Error(`No user with username ${username}`);
      err.status = 404;
      throw err;
    }

    return user;
  }

  static async update(username, data) {
    // check if password matches
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }
    // partial update query helper
    let { query, values } = partialUpdate("users", data, "username", username);
    const result = await db.query(query, values);
    const user = result.rows[0];

    // throw err if no user is found
    if (!user) {
      const err = new Error(`No user with username ${username}`);
      err.status = 404;
      throw err;
    }
    // delete user password
    delete user.password;

    return user;
  }

  static async remove(username) {
    // delete user from database
    const result = await db.query(
      `DELETE FROM users WHERE username = $1 RETURNING username`,
      [username]
    );

    // throw err if no user is found
    if (!result.rows[0]) {
      const err = new Error(`No user with username ${username}`);
      err.status = 404;
      throw err;
    }
  }
}

module.exports = User;
