import { useContext } from 'react';
import { Route as BaseRoute, Redirect, RouteProps as BaseRouteProps, useLocation } from 'react-router-dom';

import UserContext from 'contexts/UserContext';

import { encodeUri } from 'utils/url';

import Header from 'components/layout/header';

import classes from './route.module.scss';

export interface RouteProps extends BaseRouteProps {
  protected?: boolean;
  header: boolean;
}

const Route = ({ protected: protectedProp, header, ...rest }: RouteProps) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (protectedProp && !user) {
    return <Redirect to={{ pathname: '/login', search: encodeUri({ from: location.pathname + location.search }) }} />;
  }

  return (
    <div className={classes.container}>
      {header && <Header />}
      <BaseRoute {...rest} />
    </div>
  );
};

Route.defaultProps = {
  header: true,
};

export default Route;
