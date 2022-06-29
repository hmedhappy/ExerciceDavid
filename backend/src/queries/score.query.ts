import apiWrapper from "crud/apiWrapper";
import { GraphQLInt, GraphQLString } from 'graphql';
import { BestScore } from 'mutations/score.mutation';

export default {
    getBestScore: apiWrapper(
        async (args, req) => {

          return BestScore;
        },
        GraphQLInt,
        {
            score : { type : GraphQLString}
        },
        { authorizationRoles: [] },
      )
}