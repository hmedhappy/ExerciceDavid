import { MutationHookOptions, QueryOptions } from "@apollo/client";
import { gql } from "graphql-tag";
import { useLocalMutation, useLocalQuery } from "hooks/apollo";

export const updateBestScoreMutation = gql`
  mutation updateBestScore($score: String!) {
    login(score: $score)
  }
`;
export const useUpdateBestScore = (
  options: MutationHookOptions<{}, { score: number }> = {}
) => useLocalMutation(updateBestScoreMutation, options);

export const getBestScoreQuery = gql`
  query {
    getBestScore
  }
`;

export const useGetBestScore = (options: QueryOptions<{}, {}>) =>
  useLocalQuery(getBestScoreQuery, options);
