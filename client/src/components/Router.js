import React from "react";
import Header from "components/Header";
import Nav from "components/Nav";
import UserSidebar from "components/UserSidebar";
import Footer from "components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import AllSchool from "screens/AllSchool";
import MyRank from "screens/MyRank";
import SearchFriends from "screens/SearchFriends";
import LoginPage from "screens/LoginPage";
import Register from "screens/Register";
import Auth from "../HOC/Auth";
import RegisterSuccess from "screens/RegisterSuccess";
import UserProfile from "../screens/UserProfile";
import SnsSuccess from "../screens/SnsSuccess";
import ForgotPassword from "../screens/ForgotPassword";

export default () => {
  return (
    <Router>
      <Header />
      <Nav />
      <UserSidebar />
      <Switch>
        <Route path="/" exact component={Auth(AllSchool, null)} />
        {/* <Route path="/myschool" component={Auth(MySchool, null)} /> */}
        <Route path="/myrank" component={Auth(MyRank, null)} />
        <Route path="/searchfriends" component={Auth(SearchFriends, null)} />
        <Route path="/loginpage" exact component={Auth(LoginPage, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route
          path="/registersuccess"
          component={Auth(RegisterSuccess, false)}
        />
        <Route path="/snssuccess" component={Auth(SnsSuccess, true)} />
        <Route path="/userprofile" component={Auth(UserProfile, true)} />
        <Route path="/forgotpassword" component={Auth(ForgotPassword, false)} />
        <Redirect from="*" to="/" />
      </Switch>
      <Footer />
    </Router>
  );
};
