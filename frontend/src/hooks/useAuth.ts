import { useContext, useEffect } from 'react';
import { MutationHookOptions, MutationTuple } from '@apollo/client';
import localforage from 'localforage';

import { setAuthorizationBearer } from 'requests/client';
import { User, Token } from 'requests/types';
import { graphQLResult } from 'utils/graphql';

import UserContext from 'contexts/UserContext';

function useAuth<Arguments, Result extends { [key: string]: { user: User; token: Token } }>(
  fn: (options?: MutationHookOptions<Result, Arguments>) => MutationTuple<Result, Arguments>,
  stayConnected: boolean = true,
): MutationTuple<Result, Arguments> {
  const { setUser } = useContext(UserContext);
  const [call, state] = fn();

  function persistUser(data: { user: User; token: Token }) {
    const result = { ...data };
    if (!stayConnected) {
      // @ts-ignore
      delete result.token.refreshToken;
    }
    localforage.setItem('auth', JSON.stringify(result));
  }

  useEffect(() => {
    if (state.data) {
      const result = graphQLResult(state.data);
      setAuthorizationBearer(result.token.accessToken);
      persistUser(result);
      setUser(result.user);
    }
    // eslint-disable-next-line
  }, [state.data]);

  return [call, { ...state, error: state.error }];
}

export default useAuth;
