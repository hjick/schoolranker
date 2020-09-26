const User = require("../models/User");

let auth = (req, res, next) => {
  // 인증처리
  // 클라이언트 쿠키에서 토큰가져오기
  let token = req.cookies.x_auth;
  // 토큰을 복호화 한 후 유저 찾기
  if (req.user) {
    next();
  } else {
    User.findByToken(token, (err, user) => {
      if (err) throw err;
      if (!user)
        return res.json({
          _id: null,
          isLoggedIn: false,
          thumbnail: "",
          name: "",
          summoner: {
            summonerId: "",
            profileIconId: "",
            summonerLevel: "",
            tier: "",
            rank: "",
            leaguePoints: "",
          },
          school: "",
        });

      req.token = token;
      req.eUser = user;
      next();
    });
  }
};
module.exports = { auth };
