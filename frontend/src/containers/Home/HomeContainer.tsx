import UserContext from "contexts/UserContext";
import { useContext } from "react";

const HomeContainer = () => {
  const { user } = useContext(UserContext);

  return (
    <h1 className="  text-[red]  ">
      Hello {user?.firstName} {user?.lastName}
    </h1>
  );
};

export default HomeContainer;
