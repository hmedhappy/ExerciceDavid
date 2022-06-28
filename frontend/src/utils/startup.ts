import localforage from 'localforage';
import moment from 'moment';
import { FetchResult } from '@apollo/client';
import { refreshMutation, RefreshArguments, LoginData } from 'requests/auth';
import { client, setAuthorizationBearer } from 'requests/client';
import { User, Token } from 'requests/types';

export default async function startup(): Promise<User | null> {
  try {
    const authString = await localforage.getItem<string | null>('auth');
    let nextData:
      | FetchResult<
          {
            refresh: LoginData;
          },
          Record<string, any>,
          Record<string, any>
        >
      | undefined;
    let accessToken = null;
    if (!authString) {
      return null;
    }
    const { user, token }: { user: User; token: Token } = JSON.parse(authString);
    if (token.refreshToken) {
      nextData = await client.mutate<{ refresh: LoginData }, RefreshArguments>({
        mutation: refreshMutation,
        variables: { refreshToken: token.refreshToken },
      });
      if (nextData.data) {
        accessToken = nextData.data.refresh.token.accessToken;
        localforage.setItem('auth', JSON.stringify(nextData.data.refresh));
      }
    } else if (moment(token.expiresIn, 'x').diff(moment(), 'minutes') > 0) {
      accessToken = token.accessToken;
    }

    if (accessToken) {
      setAuthorizationBearer(accessToken);
    }
    return user;
  } catch (e) {
    return null;
  }
}
