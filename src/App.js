import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import AuthContextProvider from "./shared/contexts/AuthContext";
import "./App.css";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );
  const login = useCallback((loggedInId) => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userId", JSON.stringify(loggedInId));
    setUserId(loggedInId);
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContextProvider value={{ isLoggedIn, login, logout, userId }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
