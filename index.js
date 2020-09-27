const express = require("express");
const app = express();
const path = require("path");
const cool = require("cool-ascii-faces");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const config = require("./config/key");
const User = require("./models/User");
const School = require("./models/School");
const { auth } = require("./middleware/auth");
// const { LOL, SCHOOL } = require("./config/key");
const nodemailer = require("nodemailer");
// const { adminEmail, password } = require("./config/nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const request = require("request");
const axios = require("axios");
const FacebookStrategy = require("passport-facebook").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const NaverStrategy = require("passport-naver").Strategy;
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// session & passport
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  const MongoStore = require("connect-mongo")(session);
  app.use(
    session({
      secret: "Donkatsu",
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );
} else {
  app.use(
    session({
      secret: "Donkatsu",
      resave: false,
      saveUninitialized: true,
    })
  );
}

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.get("/cool", (req, res) => res.send(cool()));
// app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// Deserialize
passport.deserializeUser((id, done) => {
  User.findById({ _id: id }, function (err, user) {
    if (user) {
      // console.log("가입된유저", user);
      done(null, user);
    } else {
      // console.log("유저정보없음", user);
      done(err, user);
    }
  });
});

// 이메일인증 nodemailer
const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.EMAIL_adminEmail,
    pass: config.EMAIL_password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  const {
    school,
    summoner: { tier },
  } = req.body;

  user.save((err, userInfo) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    } else {
      if (!tier) {
        return res.status(200).json({
          success: true,
        });
      }
    }
  });

  // 학교 DB 티어가 있을때만.

  if (tier) {
    const getTierScore = (tier) => {
      switch (tier) {
        case "CHALLENGER":
          return 350;
        case "GRANDMASTER":
          return 280;
        case "MASTER":
          return 250;
        case "DIAMOND":
          return 150;
        case "PLATINUM":
          return 100;
        case "GOLD":
          return 70;
        case "SILVER":
          return 50;
        case "BRONZE":
          return 30;
        case "IRON":
          return -100;
        default:
          break;
      }
    };

    let tierScore = getTierScore(tier);

    School.findOne({ school }, (err, schoolData) => {
      if (schoolData) {
        /// 이미 등록된 학교정보가 있을때
        School.findOneAndUpdate(
          { school },
          {
            [tier]: schoolData[tier] + 1,
            students: schoolData["students"] + 1,
            totalScore: schoolData["totalScore"] + tierScore,
          },
          { upsert: true },
          (err, user) => {
            if (err) {
              return res.json({ success: false, err });
            } else {
              return res.status(200).json({
                success: true,
              });
            }
          }
        );
      } else {
        /// 등록된 학교정보가 없을때
        const schools = new School({
          school,
          CHALLENGER: 0,
          GRANDMASTER: 0,
          MASTER: 0,
          DIAMOND: 0,
          PLATINUM: 0,
          GOLD: 0,
          SILVER: 0,
          BRONZE: 0,
          IRON: 0,
          [tier]: 1,
          students: 1,
          totalScore: tierScore,
        });
        schools.save((err, schoolInfo) => {
          if (err) {
            console.log(err);
            return res.json({ success: false, err });
          } else {
            return res.status(200).json({
              success: true,
            });
          }
        });
      }
    });
  }
});

app.post("/api/users/sendEmail", (req, res) => {
  const {
    body: { email },
  } = req;
  User.findOne({ email: email }, async (err, user) => {
    if (!user) {
      const ejs = require("ejs");
      let authCode = Math.random().toString().substr(2, 6);
      let emailTemplate;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return err;
        else {
          bcrypt.hash(authCode, salt, (err, hash) => {
            if (err) return next(err);
            else authCode = hash;
          });
        }
      });
      ejs.renderFile(
        "./email/emailTemplate.ejs",
        {
          authCode: authCode,
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            emailTemplate = data;
          }
        }
      );

      const mailOptions = {
        from: config.EMAIL_adminEmail,
        to: email,
        subject: "School RanKer 회원가입 인증번호입니다!",
        html: emailTemplate,
      };

      await smtpTransport.sendMail(mailOptions, (error, responses) => {
        if (error) {
          res.json({ success: false });
        } else {
          res.json({
            success: true,
            authCode: authCode,
          });
        }
        smtpTransport.close();
      });
    } else {
      res.json({ success: false });
    }
  });
});

app.post("/api/users/forgotpassword/sendEmail", (req, res) => {
  const {
    body: { email },
  } = req;
  User.findOne({ email: email }, async (err, user) => {
    if (user) {
      const ejs = require("ejs");
      let authCode = Math.random().toString().substr(2, 6);
      let forgotPasswordEmail;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return err;
        else {
          bcrypt.hash(authCode, salt, (err, hash) => {
            if (err) return err;
            else authCode = hash;
          });
        }
      });
      ejs.renderFile(
        "./email/forgotPasswordEmail.ejs",
        {
          authCode: authCode,
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            forgotPasswordEmail = data;
          }
        }
      );

      const mailOptions = {
        from: config.EMAIL_adminEmail,
        to: email,
        subject: "School RanKer 비밀번호 변경 인증번호입니다!",
        html: forgotPasswordEmail,
      };

      await smtpTransport.sendMail(mailOptions, (error, responses) => {
        if (error) {
          res.json({ success: false });
        } else {
          res.json({
            success: true,
            authCode: authCode,
          });
        }
        smtpTransport.close();
      });
    } else {
      res.json({ success: false });
    }
  });
});

app.post("/api/users/forgotpassword/newpassword", (req, res) => {
  const { email, newPassword } = req.body;
  User.findOne({ email }, (err, user) => {
    if (user) {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return console.log(err);
        else {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) return console.log(err);
            else {
              console.log(hash);
              User.findOneAndUpdate(
                { email },
                {
                  password: hash,
                },
                (err, user) => {
                  if (err) {
                    console.log(err);
                    return res.json({ success: false, err });
                  } else {
                    return res.json({ success: true });
                  }
                }
              );
            }
          });
        }
      });
    } else {
      return res.json({ success: false, err });
    }
  });
});

app.post("/api/users/authEmail", (req, res) => {
  const plainAuthCode = req.body.authCodeValue;
  const authCode = req.body.authCode;
  bcrypt.compare(plainAuthCode, authCode, (err, isMatch) => {
    if (isMatch) {
      res.status(200).json({
        success: true,
        isMatch: true,
      });
    } else {
      res.json({
        success: false,
        isMatch: false,
      });
    }
  });
});

app.post("/api/users/search/summoner", (req, res) => {
  const { summonerInput, newSummonerInput } = req.body;
  const encodedSummonerURI = encodeURI(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${
    summonerInput ? summonerInput : newSummonerInput
  }/?api_key=${config.LOL_API_KEY}
  `);

  request(encodedSummonerURI, (err, response, body) => {
    const jsonBody = JSON.parse(body);
    if (err) {
      return res.send(err);
    } else {
      request(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${jsonBody.id}?api_key=${config.LOL_API_KEY}`,
        (err, response, rankBody) => {
          const jsonRankBody = JSON.parse(rankBody);
          if (err) return res.send(err);
          else {
            const data = { ...jsonBody, ...jsonRankBody };
            return res.send(data);
          }
        }
      );
    }
    //  return res.send(body);
  });

  // request({
  //   uri: encodedSummonerURI,
  // }).pipe(res);
});

const getTierScore = (tier) => {
  switch (tier) {
    case "CHALLENGER":
      return 350;
    case "GRANDMASTER":
      return 280;
    case "MASTER":
      return 250;
    case "DIAMOND":
      return 150;
    case "PLATINUM":
      return 100;
    case "GOLD":
      return 70;
    case "SILVER":
      return 50;
    case "BRONZE":
      return 30;
    case "IRON":
      return -100;
    default:
      break;
  }
};

app.post("/api/users/modify/summoner", (req, res) => {
  const {
    _id,
    tier,
    school,
    newSummoner,
    newSummoner: { tier: newTier },
  } = req.body;
  let tierScore = getTierScore(tier);
  let newTierScore = getTierScore(newTier);
  if (school && tier && newTier) {
    // 랭에서 랭으로
    School.findOne({ school }, (err, schoolData) => {
      if (schoolData) {
        School.findOneAndUpdate(
          { school },
          {
            [tier]: tier === newTier ? schoolData[tier] : schoolData[tier] - 1,
            [newTier]:
              tier === newTier ? schoolData[newTier] : schoolData[newTier] + 1,
            students: !tier
              ? schoolData["students"] + 1
              : schoolData["students"],
            totalScore: !tier
              ? schoolData["totalScore"] + newTierScore
              : schoolData["totalScore"] + (newTierScore - tierScore),
          },

          (err, user) => {
            if (err) {
              console.log(err);
              return res.json({ success: false, err });
            }
          }
        );
      }
    });
  } else if (school && !tier && newTier) {
    // 언랭에서 랭으로
    School.findOne({ school }, (err, schoolData) => {
      if (schoolData) {
        School.findOneAndUpdate(
          { school },
          {
            [newTier]: schoolData[newTier] + 1,
            students: schoolData["students"] + 1,
            totalScore: schoolData["totalScore"] + newTierScore,
          },

          (err, user) => {
            if (err) {
              console.log(err);
              return res.json({ success: false, err });
            }
          }
        );
      }
    });
  } else if (school && tier && !newTier) {
    // 랭에서 언랭으로
    School.findOne({ school }, (err, schoolData) => {
      if (schoolData) {
        School.findOneAndUpdate(
          { school },
          {
            [tier]: schoolData[tier] - 1,
            students: schoolData["students"] - 1,
            totalScore: schoolData["totalScore"] - tierScore,
          },

          (err, user) => {
            if (err) {
              console.log(err);
              return res.json({ success: false, err });
            }
          }
        );
      }
    });
  }

  User.findOneAndUpdate(
    {
      _id,
    },
    {
      summoner: newSummoner,
    },
    { upsert: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      else return res.status(200).json(newSummoner);
    }
  );
});

app.post("/api/users/update/summoner", (req, res) => {
  const { summonerId } = req.body;

  request(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${config.LOL_API_KEY}`,
    (err, response, body) => {
      const jsonBody = JSON.parse(body);
      if (err) {
        return res.send(err);
      } else {
        request(
          `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${config.LOL_API_KEY}`,
          (err, response, rankBody) => {
            const jsonRankBody = JSON.parse(rankBody);
            if (err) return res.send(err);
            else {
              const data = { ...jsonBody, ...jsonRankBody };
              return res.send(data);
            }
          }
        );
      }
    }
  );
});

// 학교정보
app.post("/api/users/search/school", (req, res) => {
  const request = require("request");
  const { school, newSchoolInput } = req.body;
  let schoolType;
  if (school) {
    if (school.includes("중학교")) {
      schoolType = "midd";
    } else if (school.includes("고등학교")) {
      schoolType = "high";
    } else if (school.includes("대학교")) {
      schoolType = "univ";
    }
  } else {
    if (newSchoolInput.includes("중학교")) {
      schoolType = "midd";
    } else if (newSchoolInput.includes("고등학교")) {
      schoolType = "high";
    } else if (newSchoolInput.includes("대학교")) {
      schoolType = "univ";
    }
  }

  const encodedSchoolURI = encodeURI(
    `http://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${
      config.SCHOOL_API_KEY
    }&svcType=api&svcCode=SCHOOL&contentType=json&gubun=${schoolType}_list&searchSchulNm=${
      school ? school : newSchoolInput
    }`
  );

  request(encodedSchoolURI, (err, response, body) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(body);
    }
  });
});

app.post("/api/users/modify/school", (req, res) => {
  const { _id, tier, school, newSchool } = req.body;
  if (tier && newSchool) {
    let tierScore = getTierScore(tier);
    // 학교 수정
    if (school) {
      /// 이전에 유저가 등록한 학교가 있을때
      School.findOne({ school }, (err, schoolData) => {
        School.findOneAndUpdate(
          {
            school,
          },
          {
            [tier]: schoolData[tier] - 1,
            students: schoolData["students"] - 1,
            totalScore: schoolData["totalScore"] - tierScore,
          },
          (err, user) => {
            if (err) {
              return res.json({ success: false, err });
            }
          }
        );
        if (err) {
          return res.json({ success: false, err });
        }
      });
    }
    School.findOne({ school: newSchool }, (err, schoolData) => {
      if (schoolData) {
        // DB 에 해당 학교 정보가 있을때
        School.findOneAndUpdate(
          { school: newSchool },
          {
            [tier]: schoolData[tier] + 1,
            students: schoolData["students"] + 1,
            totalScore: schoolData["totalScore"] + tierScore,
          },
          (err, user) => {
            if (err) {
              return res.json({ success: false, err });
            }
          }
        );
      } else {
        // DB 에 해당 학교 정보가 없을때
        const schools = new School({
          school: newSchool,
          CHALLENGER: 0,
          GRANDMASTER: 0,
          MASTER: 0,
          DIAMOND: 0,
          PLATINUM: 0,
          GOLD: 0,
          SILVER: 0,
          BRONZE: 0,
          IRON: 0,
          [tier]: 1,
          students: 1,
          totalScore: tierScore,
        });
        schools.save((err, schoolInfo) => {
          if (err) {
            console.log(err);
            return res.json({ success: false, err });
          }
        });
      }
    });
  }

  User.findOneAndUpdate(
    {
      _id,
    },
    {
      school: newSchool,
    },
    { upsert: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      else return res.status(200).json(newSchool);
    }
  );
});

app.get("/api/users/get/schoolList", (req, res) => {
  School.find({}, (err, docs) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      res.status(200).json(docs);
    }
  });
});

// app.get("/api/users/get/schoolList/:school", (req, res) => {
//   const school = req.params.school;
//   School.find({ school: { $regex: school } }, (err, docs) => {
//     if (err) {
//       return res.json({ success: false, err });
//     } else {
//       res.status(200).json(docs);
//     }
//   });
// });

app.get("/api/users/get/myRankInSchool/:school", (req, res) => {
  const school = req.params.school;
  User.find({ school: school }, (err, docs) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/users/get/myrank/:summoner", (req, res) => {
  const summoner = req.params.summoner;
  User.findOne({ "summoner.summonerName": summoner }, (err, user) => {
    if (user) {
      User.find({ school: user.school }, (err, users) => {
        if (err)
          return res.json({
            success: false,
            err,
          });
        else {
          const userAndUsers = { user, users };
          res.status(200).json(userAndUsers);
        }
      });
    } else {
      return res.json({
        success: false,
        msg: "등록된 소환사가 없어요 ..",
      });
    }
  });
});

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        msg: "등록된 이메일이 아니에요 !",
      });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, msg: "비밀번호가 틀려요 !" });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 쿠키에 저장

        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  if (req.user) {
    const { id, email, name, thumbnail = "", summoner = {}, school } = req.user;
    // console.log("user", req.user);
    res.status(200).json({
      _id: id,
      isLoggedIn: true,
      thumbnail,
      name,
      summoner,
      school,
    });
  } else {
    const {
      _id,
      email,
      name,
      thumbnail = "",
      summoner = {},
      school,
    } = req.eUser;
    // console.log("eUser", req.eUser);
    res.status(200).json({
      _id,
      isLoggedIn: true,
      thumbnail,
      name,
      summoner,
      school,
    });
  }
});

app.post("/api/users/forgotpassword/check", (req, res) => {
  const { name, email } = req.body;
  User.findOne({ name, email }, (err, user) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json(user);
    }
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  // facebook User logout
  if (req.user) {
    req.logout();
    res.status(200).json({ success: true });
  }

  // emailUser Logout
  if (req.eUser) {
    User.findOneAndUpdate(
      { _id: req.eUser._id },
      { token: "" },
      (err, user) => {
        if (err) return res.json({ success: false, err });
        else {
          return res.status(200).send({ success: true });
        }
      }
    );
  }
});

// Facebook 으로 로그인

// const { FACEBOOK, KAKAO, NAVER } = require("./config/passport/passport_key");
passport.use(
  new FacebookStrategy(
    {
      clientID: config.FACEBOOK_clientID,
      clientSecret: config.FACEBOOK_clientSecret,
      callbackURL: config.FACEBOOK_callbackURL,
      profileFields: ["email", "photos"],
    },
    function (accessToken, refreshToken, profile, done) {
      const {
        id,
        email,
        picture: {
          data: { url: thumbnail },
        },
      } = profile._json;
      User.findOne({ email: email }, (err, userData) => {
        if (userData) {
          // 이미 이메일로 가입한 사용자
          User.findOneAndUpdate(
            { email: email },
            { FacebookID: id, thumbnail },
            { upsert: true },
            (err, user) => {
              if (err) return done(err, userData);
              else return done(null, userData);
            }
          );
        } else {
          // 회원가입이 안되어있는 사용자
          const fUser = new User({
            FacebookID: id,
            email,
            thumbnail,
          });
          fUser.save((err, userInfo) => {
            if (err) return done(err, fUser);
            else return done(null, fUser);
          });
        }
      });
    }
  )
);

app.get(
  "/api/users/authfacebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

app.get(
  "/api/users/authfacebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// Kakao Login

passport.use(
  new KakaoStrategy(
    {
      clientID: config.KAKAO_clientID,
      clientSecret: config.KAKAO_clientSecret,
      callbackURL: config.KAKAO_callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      const {
        id,
        properties: { nickname, thumbnail_image: thumbnail },
      } = profile._json;
      // 비지니스 앱 등록 전 임시
      User.findOne({ KakaoID: id }, (err, userData) => {
        // 카카오 아이디 등록된 사람
        if (userData) {
          done(null, userData);
        } else {
          // 처음 카카오 로그인하는 사람
          const kUser = new User({
            KakaoID: id,
            kName: nickname,
            thumbnail: thumbnail,
          });
          kUser.save((err, userInfo) => {
            if (err) return done(err, kUser);
            else return done(null, kUser);
          });
        }
      });
    }
  )
);

app.get("/api/users/authkakao", passport.authenticate("kakao"));

app.get(
  "/api/users/authkakao/callback",
  passport.authenticate("kakao", {
    successRedirect: "/",
    failureRedirect: "/loginpage",
  })
);

// Naver Login

passport.use(
  new NaverStrategy(
    {
      clientID: config.NAVER_clientID,
      clientSecret: config.NAVER_clientSecret,
      callbackURL: config.NAVER_callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      const { id, email, nickname, profile_image: thumbnail } = profile._json;
      User.findOne({ email: email }, (err, userData) => {
        if (userData) {
          // 이미 가입된 사용자
          User.findOneAndUpdate(
            {
              email: email,
            },
            { NaverID: id, thumbnail },
            { upsert: true },
            (err, user) => {
              if (err) return done(err, userData);
              else return done(null, userData);
            }
          );
        } else {
          // 회원가입이 안되어있는 사용자
          const nUser = new User({
            NaverID: id,
            email,
            nName: nickname,
            thumbnail,
          });
          nUser.save((err) => {
            if (err) return done(err, nUser);
            else return done(null, nUser);
          });
        }
      });
    }
  )
);

app.get("/api/users/authnaver", passport.authenticate("naver"));

// creates an account if no account of the new user
app.get(
  "/api/users/authnaver/callback",
  passport.authenticate("naver", {
    successRedirect: "/",
    failureRedirect: "/loginpage",
  })
);

app.listen(port, () =>
  console.log(`SchoolRanKer app listening on port ${port}!`)
);
