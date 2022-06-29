import Header from "components/layout/header";
import {
  Route as BaseRoute,
  RouteProps as BaseRouteProps,
} from "react-router-dom";
import classes from "./route.module.scss";

export interface RouteProps extends BaseRouteProps {
  protected?: boolean;
  header: boolean;
}

const Route = ({ protected: protectedProp, header, ...rest }: RouteProps) => {
  // if (protectedProp && !user) {
  //   return <Redirect to={{ pathname: '/login', search: encodeUri({ from: location.pathname + location.search }) }} />;
  // }

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
