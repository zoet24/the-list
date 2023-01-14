const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchList: [
    {
      Title: String,
      Actors: String,
      Director: String,
      Genre: String,
      Plot: String,
      Poster: String,
      Runtime: String,
      Year: String,
      imdbRating: String,
    },
  ],
  favList: [
    {
      Title: String,
      Actors: String,
      Director: String,
      Genre: String,
      Plot: String,
      Poster: String,
      Runtime: String,
      Year: String,
      imdbRating: String,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
