const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 8,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  // FACEBOOK DATA
  FacebookID: {
    type: String,
  },
  KakaoID: {
    type: String,
  },
  NaverID: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  kName: {
    type: String,
  },
  nName: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  summoner: {
    type: Object,
  },
  school: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      else {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return next(err);
          else user.password = hash;
          next();
        });
      }
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    else return callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  const user = this;

  const token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save((err, user) => {
    if (err) return callback(err);
    else return callback(null, user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  const user = this;

  jwt.verify(token, "secretToken", (err, decoded) => {
    // 유저 아이디로 유저를 찾고
    // 클라이언트에서 가져온 Token 과 DB에 보관된 토큰 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, (err, user) => {
      if (err) return callback(err);
      else return callback(null, user);
    });
  });
};

module.exports = mongoose.model("User", userSchema);
