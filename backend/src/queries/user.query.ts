import get from "crud/get";
import list from "crud/list";
import { GraphQLString } from "graphql";
import UserModel, { Role } from "models/user.model";
import { UserType } from "types/user.type";

export default {
  users: list(UserModel, UserType, {
    authorizationRoles: [Role.ADMIN],
    args: {
      name: { type: GraphQLString },
    },
  }),
  user: get(UserModel, UserType, { authorizationRoles: [Role.ADMIN] }),
};
