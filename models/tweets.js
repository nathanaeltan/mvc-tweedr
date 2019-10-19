const sha256 = require("js-sha256");

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = dbPoolInstance => {
  // `dbPoolInstance` is accessible within this function scope

  let addUser = (newUser, callback) => {
    let username = newUser.username;
    let hashPassword = sha256(newUser.password);
    let input = [username, hashPassword];
    let query = "INSERT INTO users (username, password) VALUES ($1, $2) ";
    dbPoolInstance.query(query, input, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        if (result.rows.length > 0) {
          console.log(result.rows[0]);
          callback(null, result.rows[0]);
        } else {
          callback(null, null);
        }
      }
    });
  };

  let checkUser = (user, callback) => {
    let input = [user.username];
    let queryString = "SELECT * FROM users WHERE users.username=$1";

    dbPoolInstance.query(queryString, input, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        if (result.rows.length > 0) {
          if (sha256(user.password) === result.rows[0].password) {
            callback(null, result.rows[0]);
          } else {
            callback(null, "correct");
          }
        } else {
          callback(null, null);
        }
      }
    });
  };

  let addNewTweet = (tweet, userid, callback) => {
    let newTweet = tweet.tweet;
    let userId = userid;
    let input = [newTweet, userId];
    let queryString = "INSERT INTO tweets (tweet, user_id) VALUES ($1, $2)";
    dbPoolInstance.query(queryString, input, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        if (result.rows.length > 0) {
          console.log("THIS IS THE TWEET" + result.rows[0]);
        } else {
          callback(null, null);
        }
      }
    });
  };

  let allTweets = (userId, callback) => {
    let input = [userId];
    let queryString = "SELECT * FROM tweets WHERE user_id=$1";
    dbPoolInstance.query(queryString, input, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        if (result.rows.length > 0) {
          callback(null, result.rows);
        } else {
          callback(null, null);
        }
      }
    });
  };

  return {
    addUser,
    checkUser,
    addNewTweet,
    allTweets
  };
};
