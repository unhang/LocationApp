import React, {useState} from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = () => {
    setIsLoggedIn(true);
  }
  const logout = () => {
    setIsLoggedIn(false); 
  }
  return (
    <AuthContextProvider value={isLoggedIn, login, logout}>
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" exact>
              <Users />
            </Route>
            <Route path="/:userId/places" exact>
              <UserPlaces />
            </Route>
            <Route path="/places/new" exact>
              <NewPlace />
            </Route>
            <Route path="/places/:placeId" exact>
              <UpdatePlace />
            </Route>
            <Route path="/auth" exact>
              <Auth />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
