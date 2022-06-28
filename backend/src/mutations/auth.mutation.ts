import { GraphQLError, GraphQLNonNull, GraphQLString } from 'graphql';
import joi from 'joi';

import apiWrapper from 'crud/apiWrapper';
import create from 'crud/create';
import User, { Role } from 'models/user.model';
import RefreshToken from 'models/refreshToken.model';
import { AuthType } from 'types/auth.type';
import { generateTokenResponse, getAgent } from 'utils/authHelpers';

const refreshSchema = {
  refreshToken: joi.string().required(),
};

const loginSchema = {
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().required().min(6).max(128),
};

const registerSchema = {
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
  firstName: joi.string().min(1).max(30).required(),
  lastName: joi.string().min(1).max(30).required(),
};

export default {
  login: apiWrapper(
    async (args, req) => {
      const user = await User.findOne({ email: args.email });
      if (!user || !(await user.passwordMatches(args.password)))
        throw new GraphQLError('Email et mot de passe ne correspondent pas');

      const token = await generateTokenResponse(user, req);

      return { token, user };
    },
    AuthType,
    {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    { validateSchema: loginSchema },
  ),
  register: create(
    User,
    {
      email: { type: GraphQLString, required: true },
      password: { type: GraphQLString, required: true },
      firstName: { type: GraphQLString, required: true },
      lastName: { type: GraphQLString, required: true },
    },
    AuthType,
    {
      validateSchema: registerSchema,
      pre: async (args) => {
        const { email, ...rest } = args;
        if (email) {
          const existEmail = await User.findOne({ email });
          if (existEmail) throw new GraphQLError('Email existe déjà');
        }
        return { ...rest, email };
      },
      post: async ({ result: user, request }) => {
        const token = await generateTokenResponse(user, request);
        return { user, token };
      },
    },
  ),
  refresh: apiWrapper(
    async (args, req) => {
      const refreshToken = await RefreshToken.findOne({
        token: args.refreshToken,
      });

      if (!refreshToken) throw new GraphQLError('Invalid token');
      const user = await User.findOne({ _id: refreshToken.user });
      if (!user) throw new GraphQLError('Invalid token');
      const token = await generateTokenResponse(user, req);
      return { user, token };
    },
    AuthType,
    {
      refreshToken: { type: new GraphQLNonNull(GraphQLString) },
    },
    {
      validateSchema: refreshSchema,
    },
  ),
  logout: apiWrapper(
    async (args, req) => {
      const { user } = req;
      const agent = getAgent(req);
      if (user) {
        await RefreshToken.deleteOne({ userId: user.id, agent });
      }
      return 'done';
    },
    GraphQLString,
    {},
    { authorizationRoles: [Role.USER, Role.ADMIN] },
  ),
};
