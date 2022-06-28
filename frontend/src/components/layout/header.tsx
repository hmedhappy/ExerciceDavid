import UserContext from 'contexts/UserContext';
import localforage from 'localforage';
import { useContext, useEffect } from 'react';
import { useLogout } from 'requests/auth';
import classes from './header.module.scss';

const Header = () => {
  const [logoutCall, { data: logoutData }] = useLogout();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (logoutData) {
      setUser(null);
      localforage.clear();
    }
  }, [logoutData]); // eslint-disable-line

  return (
    <header className={classes.container}>
      <button onClick={() => logoutCall()}>Logout</button>
    </header>
  );
};

export default Header;
