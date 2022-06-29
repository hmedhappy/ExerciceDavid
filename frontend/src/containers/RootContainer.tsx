import Route from "components/ui/Route/Route";
import UserContext from "contexts/UserContext";
import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "requests/types";
import startup from "utils/startup";
import HomeContainer from "./Home/HomeContainer";
import LoginContainer from "./Login/LoginContainer";

const RootContainer = () => {
  const [user, setUser] = useState(null as User | null);
  const [startupEnded, setStartupEnded] = useState(false);

  useEffect(() => {
    startup().then((u) => {
      setUser(u);
      setStartupEnded(true);
    });
  }, []);

  if (!startupEnded) return <div />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ToastContainer />
      <Switch>
        <Route
          path="/"
          exact
          header={false}
          protected
          component={HomeContainer}
        />
        <Route header={false} path="/login" exact component={LoginContainer} />
      </Switch>
    </UserContext.Provider>
  );
};

export default RootContainer;
