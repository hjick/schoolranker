import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGIN_FACEBOOK,
  MODIFY_SUMMONER,
  MODIFY_SCHOOL,
} from "../_actions/types";
const initialState = {
  userData: {
    _id: null,
    isLoggedIn: false,
    thumbnail: "",
    name: "",
    summoner: {
      summonerName: "",
      summonerId: "",
      profileIconId: "",
      summonerLevel: "",
      tier: "",
      rank: "",
      leaguePoints: "",
    },
    school: "",
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, register: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    case LOGIN_FACEBOOK:
      return { ...state, facebook: action.payload };

    case MODIFY_SUMMONER:
      return { ...state, summoner: { ...action.payload } };

    case MODIFY_SCHOOL:
      return { ...state, school: action.payload };

    default:
      return state;
  }
};
