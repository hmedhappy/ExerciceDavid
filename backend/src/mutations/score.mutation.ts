import apiWrapper from "crud/apiWrapper";
import { GraphQLString } from 'graphql';

export let BestScore = 123123

export default {
    updateBestScoreMutation: apiWrapper(
        async (args, req) => {

            BestScore = args?.score ;
          return 'Score Updates';
        },
        GraphQLString,
        {
            score : { type : GraphQLString}
        },
        { authorizationRoles: [] },
      )
}